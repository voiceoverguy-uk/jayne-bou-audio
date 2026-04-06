import { Router, type Request, type Response } from "express";

const router = Router();

router.get("/debug", (_req: Request, res: Response) => {
  res.json({
    env: {
      EBAY_CLIENT_ID: process.env.EBAY_CLIENT_ID ? "set" : "MISSING",
      EBAY_CLIENT_SECRET: process.env.EBAY_CLIENT_SECRET ? "set" : "MISSING",
      EBAY_SELLER_ID: process.env.EBAY_SELLER_ID
        ? `set (${process.env.EBAY_SELLER_ID})`
        : "MISSING",
      NODE_ENV: process.env.NODE_ENV ?? "not set",
    },
  });
});

export default router;
