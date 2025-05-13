const express = require("express");
const courseRoutes = require("./coursesRoutes");
const instructorRoutes = require("./instructorsRoutes");
const eventsRoutes = require("./eventsRoutes");

const router = express.Router();

router.use("/courses", courseRoutes);
router.use("/instructors", instructorRoutes);
router.use("/events", eventsRoutes);

module.exports = router;
