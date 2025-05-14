const Instructor = require("../models/instructor");

/**
 * @description Get all instructors
 * @route GET /api/v1/instructors
 * @access Public
 */
async function getInstructors(req, res) {
  try {
    const instructors = await Instructor.getAll();

    res.render("instructors", {
      title: "Instructors",
      description:
        "Our team of passionate educators bring real-world experience to the virtual classrooms",
      instructors,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching instructors" });
  }
}

module.exports = {
  getInstructors,
};
