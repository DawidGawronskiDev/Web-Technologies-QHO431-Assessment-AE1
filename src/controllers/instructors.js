const Instructor = require("../models/instructor");

/**
 * @description Get all instructors
 * @route GET /api/v1/instructors
 * @access Public
 */
async function getInstructors(req, res) {
  try {
    const instructors = await Instructor.getAll();
    console.log(instructors);

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

async function getInstructor(req, res) {
  try {
    const instructor = await Instructor.getInstructor(req.params.id);
    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    res.render("instructor", {
      title: instructor.name,
      description: instructor.bio,
      instructor,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching instructor" });
  }
}

module.exports = {
  getInstructors,
  getInstructor,
};
