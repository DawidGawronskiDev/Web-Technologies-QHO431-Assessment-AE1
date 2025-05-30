const express = require("express");
const courseController = require("../controllers/course");

const router = express.Router();

router.get("/", courseController.getCourses);
router.get("/:id", courseController.getCourse);

module.exports = router;
