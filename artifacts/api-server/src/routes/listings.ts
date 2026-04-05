import { Router, type Request, type Response } from "express";
import { fetchEbayListings } from "../services/ebay.js";

const router = Router();

router.get("/listings", async (_req: Request, res: Response) => {
  try {
    const listings = await fetchEbayListings();
    res.json({ listings, total: listings.length });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("eBay listings error:", message);

    if (message === "EBAY_CREDENTIALS_MISSING") {
      res.status(503).json({
        error: "eBay API credentials not configured",
        listings: [],
        total: 0,
      });
    } else {
      res.status(502).json({
        error: "Unable to fetch listings from eBay",
        listings: [],
        total: 0,
      });
    }
  }
});

export default router;
