const Instructor = require("../models/instructor");

/**
 * @description Get all instructors
 * @route GET /api/v1/instructors
 * @access Public
 */
async function getInstructors(req, res) {
  try {
    const instructors = await Instructor.getAll();
    res.status(200).json({ data: instructors }, { status: 200 });
  } catch (error) {
    res.status(500).json({ message: "Error fetching instructors" });
  }
}

module.exports = {
  getInstructors,
};
