import express from "express";
import { getInstructor, getInstructors } from "../controllers/instructor.mjs";

const router = express.Router();

router.get("/", getInstructors).get("/:id", getInstructor);

export default router;
