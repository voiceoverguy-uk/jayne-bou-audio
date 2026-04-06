import { Router, type Request, type Response } from "express";

const router = Router();

router.get("/debug", async (_req: Request, res: Response) => {
  const clientId = process.env.EBAY_CLIENT_ID ?? "";
  const clientSecret = process.env.EBAY_CLIENT_SECRET ?? "";
  const sellerId = process.env.EBAY_SELLER_ID ?? "";

  const envCheck = {
    EBAY_CLIENT_ID: clientId ? `set (${clientId.slice(0, 12)}...)` : "MISSING",
    EBAY_CLIENT_SECRET: clientSecret ? `set (${clientSecret.slice(0, 8)}...)` : "MISSING",
    EBAY_SELLER_ID: sellerId || "MISSING",
    NODE_ENV: process.env.NODE_ENV ?? "not set",
  };

  if (!clientId || !clientSecret || !sellerId) {
    res.json({ envCheck, ebayAuth: "skipped — credentials missing" });
    return;
  }

  // Test eBay OAuth token
  let tokenResult: string;
  let browseResult: string | null = null;

  try {
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const tokenRes = await fetch("https://api.ebay.com/identity/v1/oauth2/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope",
    });

    if (!tokenRes.ok) {
      const text = await tokenRes.text();
      tokenResult = `FAILED (${tokenRes.status}): ${text.slice(0, 300)}`;
    } else {
      const tokenData = (await tokenRes.json()) as { access_token: string };
      const token = tokenData.access_token;
      tokenResult = "OK";

      // Test Browse API
      const browseUrl = new URL("https://api.ebay.com/buy/browse/v1/item_summary/search");
      browseUrl.searchParams.set("category_ids", "293");
      browseUrl.searchParams.set("filter", `sellers:{${sellerId}}`);
      browseUrl.searchParams.set("limit", "3");

      const browseRes = await fetch(browseUrl.toString(), {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-EBAY-C-MARKETPLACE-ID": "EBAY-GB",
          "X-EBAY-C-ENDUSERCTX": "contextualLocation=country%3DGB",
        },
      });

      if (!browseRes.ok) {
        const text = await browseRes.text();
        browseResult = `FAILED (${browseRes.status}): ${text.slice(0, 500)}`;
      } else {
        const data = (await browseRes.json()) as { total?: number; itemSummaries?: unknown[] };
        browseResult = `OK — total: ${data.total ?? 0}, items returned: ${data.itemSummaries?.length ?? 0}`;
      }
    }
  } catch (err) {
    tokenResult = `ERROR: ${err instanceof Error ? err.message : String(err)}`;
  }

  res.json({ envCheck, ebayAuth: tokenResult, ebayBrowse: browseResult });
});

export default router;
