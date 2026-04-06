"use strict";
// Vercel serverless function — zero external dependencies, pure Node.js built-ins.

const https = require("https");

let listingsCache = null;
let listingsCacheAt = 0;
const CACHE_TTL = 15 * 60 * 1000;

function httpsRequest(method, urlStr, headers, body) {
  return new Promise((resolve, reject) => {
    const u = new URL(urlStr);
    const opts = { hostname: u.hostname, path: u.pathname + u.search, method, headers: { ...headers } };
    if (body) { const buf = Buffer.from(body); opts.headers["Content-Length"] = buf.length; }
    const req = https.request(opts, (res) => {
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve({ status: res.statusCode, text: Buffer.concat(chunks).toString() }));
    });
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

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

  // ── GET /api/debug — full live eBay test ─────────────────────────────────────
  if (url.includes("/debug")) {
    const diag = {
      hasClientId: !!CLIENT_ID,
      hasClientSecret: !!CLIENT_SECRET,
      hasSellerId: !!SELLER_ID,
      sellerIdValue: SELLER_ID || null,
      clientIdPrefix: CLIENT_ID ? CLIENT_ID.slice(0, 16) + "..." : null,
      nodeVersion: process.version,
      nodeEnv: process.env.NODE_ENV,
      oauthStage: null,
      browseStage: null,
      itemCount: null,
      error: null,
    };

    if (!CLIENT_ID || !CLIENT_SECRET || !SELLER_ID) {
      diag.error = "Credentials missing — check env vars";
      res.end(JSON.stringify(diag, null, 2));
      return;
    }

    try {
      const creds = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
      const tokenRes = await httpsRequest(
        "POST",
        "https://api.ebay.com/identity/v1/oauth2/token",
        { Authorization: `Basic ${creds}`, "Content-Type": "application/x-www-form-urlencoded" },
        "grant_type=client_credentials&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope"
      );
      diag.oauthStage = `HTTP ${tokenRes.status}`;
      if (tokenRes.status !== 200) {
        diag.error = `OAuth failed: ${tokenRes.status} — ${tokenRes.text.slice(0, 200)}`;
        res.end(JSON.stringify(diag, null, 2));
        return;
      }
      const token = JSON.parse(tokenRes.text).access_token;
      diag.oauthStage = "OK — token obtained";

      const params = new URLSearchParams({ category_ids: "293", filter: `sellers:{${SELLER_ID}}`, limit: "3", sort: "newlyListed" });
      const browseRes = await httpsRequest(
        "GET",
        `https://api.ebay.com/buy/browse/v1/item_summary/search?${params}`,
        { Authorization: `Bearer ${token}`, "X-EBAY-C-MARKETPLACE-ID": "EBAY-GB", "X-EBAY-C-ENDUSERCTX": "contextualLocation=country%3DGB" }
      );
      diag.browseStage = `HTTP ${browseRes.status}`;
      if (browseRes.status !== 200) {
        diag.error = `Browse API failed: ${browseRes.status} — ${browseRes.text.slice(0, 300)}`;
        res.end(JSON.stringify(diag, null, 2));
        return;
      }
      const data = JSON.parse(browseRes.text);
      diag.itemCount = data.itemSummaries?.length ?? 0;
      diag.browseStage = `OK — ${diag.itemCount} items returned (total: ${data.total})`;
    } catch (err) {
      diag.error = `Exception: ${err.message}`;
    }

    res.end(JSON.stringify(diag, null, 2));
    return;
  }

  // ── GET /api/listings ─────────────────────────────────────────────────────────
  if (url.includes("/listings")) {
    // Config check
    if (!CLIENT_ID || !CLIENT_SECRET || !SELLER_ID) {
      res.statusCode = 503;
      res.end(JSON.stringify({
        ok: false, stage: "config", message: "eBay credentials missing",
        hasClientId: !!CLIENT_ID, hasClientSecret: !!CLIENT_SECRET, hasSellerId: !!SELLER_ID,
        listings: [], total: 0,
      }));
      return;
    }

    // Serve from cache
    if (listingsCache && Date.now() - listingsCacheAt < CACHE_TTL) {
      res.end(JSON.stringify({ listings: listingsCache, total: listingsCache.length }));
      return;
    }

    // OAuth
    let token;
    try {
      const creds = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
      const tokenRes = await httpsRequest(
        "POST",
        "https://api.ebay.com/identity/v1/oauth2/token",
        { Authorization: `Basic ${creds}`, "Content-Type": "application/x-www-form-urlencoded" },
        "grant_type=client_credentials&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope"
      );
      if (tokenRes.status !== 200) {
        res.statusCode = 502;
        res.end(JSON.stringify({
          ok: false, stage: "oauth", message: `OAuth HTTP ${tokenRes.status}`,
          detail: tokenRes.text.slice(0, 300),
          hasClientId: true, hasClientSecret: true, hasSellerId: true,
          listings: [], total: 0,
        }));
        return;
      }
      token = JSON.parse(tokenRes.text).access_token;
    } catch (err) {
      res.statusCode = 502;
      res.end(JSON.stringify({
        ok: false, stage: "oauth", message: err.message,
        hasClientId: !!CLIENT_ID, hasClientSecret: !!CLIENT_SECRET, hasSellerId: !!SELLER_ID,
        listings: [], total: 0,
      }));
      return;
    }

    // eBay Browse
    try {
      const params = new URLSearchParams({ category_ids: "293", filter: `sellers:{${SELLER_ID}}`, limit: "50", sort: "newlyListed" });
      const browseRes = await httpsRequest(
        "GET",
        `https://api.ebay.com/buy/browse/v1/item_summary/search?${params}`,
        { Authorization: `Bearer ${token}`, "X-EBAY-C-MARKETPLACE-ID": "EBAY-GB", "X-EBAY-C-ENDUSERCTX": "contextualLocation=country%3DGB" }
      );
      if (browseRes.status !== 200) {
        res.statusCode = 502;
        res.end(JSON.stringify({
          ok: false, stage: "browse", message: `eBay Browse HTTP ${browseRes.status}`,
          detail: browseRes.text.slice(0, 300),
          hasClientId: true, hasClientSecret: true, hasSellerId: true,
          listings: [], total: 0,
        }));
        return;
      }
      const data = JSON.parse(browseRes.text);
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
      res.end(JSON.stringify({ ok: true, listings, total: listings.length }));
    } catch (err) {
      res.statusCode = 502;
      res.end(JSON.stringify({
        ok: false, stage: "browse", message: err.message,
        hasClientId: true, hasClientSecret: true, hasSellerId: true,
        listings: [], total: 0,
      }));
    }
    return;
  }

  // ── POST /api/contact ─────────────────────────────────────────────────────────
  if (url.includes("/contact") && req.method === "POST") {
    let body = "";
    req.on("data", (c) => (body += c));
    req.on("end", async () => {
      try {
        const { name, email, subject, message } = JSON.parse(body);
        const RESEND_KEY = process.env.RESEND_API_KEY;
        const TO = process.env.RESEND_TO_EMAIL || "dave@maidisonbou.com";
        const FROM = process.env.RESEND_FROM_EMAIL || "noreply@jaynebou.com";
        if (!RESEND_KEY) { res.statusCode = 503; res.end(JSON.stringify({ error: "Email not configured" })); return; }
        const r = await httpsRequest(
          "POST", "https://api.resend.com/emails",
          { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
          JSON.stringify({ from: FROM, to: TO, subject: `[JayneBou.com] ${subject || `Message from ${name}`}`, text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}` })
        );
        if (r.status === 200 || r.status === 201) { res.end(JSON.stringify({ success: true })); }
        else { throw new Error(`Resend ${r.status}: ${r.text.slice(0, 200)}`); }
      } catch (err) { res.statusCode = 500; res.end(JSON.stringify({ error: err.message })); }
    });
    return;
  }

  // ── Default ───────────────────────────────────────────────────────────────────
  res.end(JSON.stringify({ name: "Jayne Bou Audio API", status: "ok" }));
};
