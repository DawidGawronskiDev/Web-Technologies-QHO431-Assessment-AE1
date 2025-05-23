const FAQs = require("../models/faqs");

/**
 * @description Get all FAQs
 * @route GET /api/v1/faqs
 * @access Public
 */
async function getFAQs(req, res) {
  try {
    const faqs = await FAQs.getAll();

    res.status(200).json({ data: faqs }, { status: 200 });
  } catch (error) {
    res.status(500).json({ message: "Error fetching FAQs" });
  }
}

module.exports = {
  getFAQs,
};
