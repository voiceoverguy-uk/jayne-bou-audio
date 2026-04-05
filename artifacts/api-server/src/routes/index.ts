import { Router } from "express";
import healthRouter from "./health.js";
import contactRouter from "./contact.js";
import listingsRouter from "./listings.js";

const router = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(listingsRouter);

export default router;
