import express from "express";
import { getFAQs } from "../controllers/faqs.mjs";

const router = express.Router();

router.get("/", getFAQs);

export default router;
