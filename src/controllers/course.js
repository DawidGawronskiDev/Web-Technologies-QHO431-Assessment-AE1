const Course = require("../models/course");
const Instructor = require("../models/instructor");

/**
 * @description Get all courses
 * @route GET /api/v1/courses
 * @access Public
 */
async function getCourses(req, res) {
  try {
    const courses = await Course.getAll();

    console.log(courses);

    res.render("courses", {
      title: "Courses",
      description: "List of all courses",
      courses,
    });
  } catch (error) {
    console.error("Error fetching courses: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getCourse(req, res) {
  try {
    const course = await Course.getCourseById(req.params.id);
    const instructor = await Instructor.getInstructor(course.instructor_id);

    if (!course || !instructor) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.render("course", {
      title: course.name,
      description: course.description,
      course,
      instructor,
    });
  } catch (error) {
    throw new Error("Error fetching course details: " + error.message);
  }
}

module.exports = {
  getCourses,
  getCourse,
};
