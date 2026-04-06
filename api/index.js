"use strict";
// Vercel serverless function — zero external dependencies, pure Node.js built-ins.
// Handles: GET /api/listings, GET /api/debug, POST /api/contact

const https = require("https");

// ── In-memory cache ────────────────────────────────────────────────────────────
let listingsCache = null;
let listingsCacheAt = 0;
const CACHE_TTL = 15 * 60 * 1000; // 15 min

// ── Tiny HTTP helpers ──────────────────────────────────────────────────────────
function httpsRequest(method, urlStr, headers, body) {
  return new Promise((resolve, reject) => {
    const u = new URL(urlStr);
    const opts = {
      hostname: u.hostname,
      path: u.pathname + u.search,
      method,
      headers: { ...headers },
    };
    if (body) {
      const buf = Buffer.from(body);
      opts.headers["Content-Length"] = buf.length;
    }
    const req = https.request(opts, (res) => {
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () =>
        resolve({ status: res.statusCode, text: Buffer.concat(chunks).toString() })
      );
    });
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

// ── eBay helpers ───────────────────────────────────────────────────────────────
async function getEbayToken(clientId, clientSecret) {
  const creds = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const r = await httpsRequest(
    "POST",
    "https://api.ebay.com/identity/v1/oauth2/token",
    {
      Authorization: `Basic ${creds}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    "grant_type=client_credentials&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope"
  );
  if (r.status !== 200) throw new Error(`eBay auth ${r.status}: ${r.text.slice(0, 200)}`);
  return JSON.parse(r.text).access_token;
}

async function fetchListings(clientId, clientSecret, sellerId) {
  if (listingsCache && Date.now() - listingsCacheAt < CACHE_TTL) return listingsCache;

  const token = await getEbayToken(clientId, clientSecret);

  const params = new URLSearchParams({
    category_ids: "293",
    filter: `sellers:{${sellerId}}`,
    limit: "50",
    sort: "newlyListed",
  });
  const r = await httpsRequest(
    "GET",
    `https://api.ebay.com/buy/browse/v1/item_summary/search?${params}`,
    {
      Authorization: `Bearer ${token}`,
      "X-EBAY-C-MARKETPLACE-ID": "EBAY-GB",
      "X-EBAY-C-ENDUSERCTX": "contextualLocation=country%3DGB",
    }
  );
  if (r.status !== 200) throw new Error(`eBay browse ${r.status}: ${r.text.slice(0, 300)}`);

  const data = JSON.parse(r.text);
  const listings = (data.itemSummaries || []).map((item) => ({
    id: item.itemId,
    title: item.title,
    price: item.price?.value ?? "0.00",
    currency: item.price?.currency ?? "GBP",
    condition: item.condition ?? "Used",
    imageUrl: item.image?.imageUrl ?? null,
    ebayUrl: item.itemWebUrl,
    category: item.categories?.[0]?.categoryName ?? "Hi-Fi Equipment",
  }));

  listingsCache = listings;
  listingsCacheAt = Date.now();
  return listings;
}

// ── Main handler ───────────────────────────────────────────────────────────────
module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") { res.statusCode = 204; res.end(); return; }

  const url = req.url || "";
  const CLIENT_ID = process.env.EBAY_CLIENT_ID;
  const CLIENT_SECRET = process.env.EBAY_CLIENT_SECRET;
  const SELLER_ID = process.env.EBAY_SELLER_ID;

  // GET /api/debug
  if (url.includes("/debug")) {
    res.end(JSON.stringify({
      env: {
        EBAY_CLIENT_ID: CLIENT_ID ? `set (${CLIENT_ID.slice(0, 12)}...)` : "MISSING",
        EBAY_CLIENT_SECRET: CLIENT_SECRET ? "set" : "MISSING",
        EBAY_SELLER_ID: SELLER_ID || "MISSING",
        NODE_ENV: process.env.NODE_ENV,
      },
    }));
    return;
  }

  // GET /api/listings
  if (url.includes("/listings")) {
    if (!CLIENT_ID || !CLIENT_SECRET || !SELLER_ID) {
      res.statusCode = 503;
      res.end(JSON.stringify({ error: "eBay credentials missing", listings: [], total: 0 }));
      return;
    }
    try {
      const listings = await fetchListings(CLIENT_ID, CLIENT_SECRET, SELLER_ID);
      res.end(JSON.stringify({ listings, total: listings.length }));
    } catch (err) {
      console.error("listings error:", err.message);
      res.statusCode = 502;
      res.end(JSON.stringify({ error: err.message, listings: [], total: 0 }));
    }
    return;
  }

  // POST /api/contact
  if (url.includes("/contact") && req.method === "POST") {
    let body = "";
    req.on("data", (c) => (body += c));
    req.on("end", async () => {
      try {
        const { name, email, subject, message } = JSON.parse(body);
        const RESEND_KEY = process.env.RESEND_API_KEY;
        const TO = process.env.RESEND_TO_EMAIL || "dave@maidisonbou.com";
        const FROM = process.env.RESEND_FROM_EMAIL || "noreply@jaynebou.com";
        if (!RESEND_KEY) {
          res.statusCode = 503;
          res.end(JSON.stringify({ error: "Email not configured" }));
          return;
        }
        const r = await httpsRequest(
          "POST",
          "https://api.resend.com/emails",
          { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
          JSON.stringify({
            from: FROM,
            to: TO,
            subject: `[JayneBou.com] ${subject || `Message from ${name}`}`,
            text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
          })
        );
        if (r.status === 200 || r.status === 201) {
          res.end(JSON.stringify({ success: true }));
        } else {
          throw new Error(`Resend ${r.status}: ${r.text.slice(0, 200)}`);
        }
      } catch (err) {
        console.error("contact error:", err.message);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Default
  res.end(JSON.stringify({ name: "Jayne Bou Audio API", status: "ok" }));
};
