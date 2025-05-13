const express = require("express");
const courseRoutes = require("./courses");
const instructorRoutes = require("./instructors");
const eventsRoutes = require("./events");

const router = express.Router();

router.use("/courses", courseRoutes);
router.use("/instructors", instructorRoutes);
router.use("/events", eventsRoutes);

module.exports = router;
