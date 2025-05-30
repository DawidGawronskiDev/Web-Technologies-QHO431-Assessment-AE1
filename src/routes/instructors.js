const express = require("express");
const instructorController = require("../controllers/instructors");

const router = express.Router();

router.get("/", instructorController.getInstructors);
router.get("/:id", instructorController.getInstructor);

module.exports = router;
