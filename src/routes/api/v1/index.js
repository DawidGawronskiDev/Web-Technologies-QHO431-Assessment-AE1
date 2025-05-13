const express = require("express");
const courseRoutes = require("./coursesRoutes");

const router = express.Router();

router.use("/courses", courseRoutes);

module.exports = router;
