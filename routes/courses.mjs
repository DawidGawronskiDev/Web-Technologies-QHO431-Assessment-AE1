import express from "express";
import { getCourse, getCourses } from "../controllers/course.mjs";

const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourse);

export default router;
