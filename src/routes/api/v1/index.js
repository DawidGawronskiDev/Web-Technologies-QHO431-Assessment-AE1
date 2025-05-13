const express = require("express");
const courseRoutes = require("./coursesRoutes");
const instructorRoutes = require("./instructorsRoutes");

const router = express.Router();

router.use("/courses", courseRoutes);
router.use("/instructors", instructorRoutes);

module.exports = router;
