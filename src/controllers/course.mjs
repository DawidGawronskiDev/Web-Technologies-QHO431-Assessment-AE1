import Course from "../models/course.mjs";
import Instructor from "../models/instructor.mjs";

export async function getCourses(req, res) {
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

export async function getCourse(req, res) {
  try {
    const course = await Course.getCourseById(req.params.id);
    if (!course) {
      throw new Error("Course not found");
    }

    const instructor = await Instructor.getInstructor(course.instructor_id);
    if (!instructor) {
      throw new Error("Instructor not found");
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
