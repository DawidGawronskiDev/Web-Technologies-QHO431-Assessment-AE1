import express from "express";
import { getIndex } from "../controllers/index.mjs";

const router = express.Router();

router.get("/", getIndex);

export default router;
