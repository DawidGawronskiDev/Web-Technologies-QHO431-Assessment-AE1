import FAQs from "../models/faqs.mjs";

export async function getFAQs(req, res) {
  try {
    const faqs = await FAQs.getAll();

    res.render("faqs", {
      title: "FAQs",
      description: "Frequently Asked Questions",
      faqs,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching FAQs" });
  }
}
