import express from "express";
import { getEvents } from "../controllers/events.mjs";

const router = express.Router();

router.get("/", getEvents);

export default router;
