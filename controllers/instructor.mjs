import Instructor from "../models/instructor.mjs";
import Event from "../models/event.mjs";
import Course from "../models/course.mjs";

export async function getInstructors(req, res) {
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

export async function getInstructor(req, res) {
  try {
    const instructor = await Instructor.getInstructor(req.params.id);
    const events = await Event.getEventByInstructorId(req.params.id);
    const courses = await Course.getCoursesByInstructorId(req.params.id);

    if (!instructor || !events || !courses) {
      throw new Error("Instructor not found");
    }

    res.render("instructor", {
      title: instructor.name,
      description: instructor.bio,
      instructor,
      events,
      courses,
    });
  } catch (error) {
    throw new Error();
  }
}
