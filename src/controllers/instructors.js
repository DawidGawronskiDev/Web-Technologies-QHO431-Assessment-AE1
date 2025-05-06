const Instructor = require("../models/instructor");

async function getInstructors(req, res) {
  try {
    const instructors = await Instructor.getAll();

    res.render("instructors", {
      title: "Instructors",
      description: "Meet our expert instructors!",
      instructors,
    });
  } catch (error) {
    console.error("Error fetching instructors: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getInstructors,
};
