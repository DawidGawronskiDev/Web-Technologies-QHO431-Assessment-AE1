const express = require("express");
const faqsController = require("../../../controllers/faqs");

const router = express.Router();

router.get("/", faqsController.getFAQs);

module.exports = router;
