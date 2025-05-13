const Course = require("../models/course");

/**
 * @description Get all courses
 * @route GET /api/v1/courses
 * @access Public
 */
async function getCourses(req, res) {
  try {
    const courses = await Course.getAll();

    res.json({ data: courses }, { status: 200 });
  } catch (error) {
    console.error("Error fetching courses: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getCourses,
};
