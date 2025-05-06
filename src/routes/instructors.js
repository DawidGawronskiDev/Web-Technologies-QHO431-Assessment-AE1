const express = require("express");
const db = require("../lib/db");
const { getInstructors } = require("../controllers/instructors");

const router = express.Router();

router.get("/", getInstructors);

module.exports = router;
