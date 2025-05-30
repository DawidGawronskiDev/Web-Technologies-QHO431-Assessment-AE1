const express = require("express");
const instructorController = require("../controllers/instructors");

const router = express.Router();

router
  .get("/", instructorController.getInstructors)
  .get("/:id", instructorController.getInstructor);

module.exports = router;
