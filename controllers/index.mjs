import Course from "../models/course.mjs";

export async function getIndex(req, res) {
  try {
    const courses = await Course.getAll();

    res.render("index", {
      title: "Home",
      description:
        "Welcome to our online learning platform, where knowledge meets convenience.",
      courses: courses.slice(0, 3),
    });
  } catch (error) {
    console.error("Error fetching courses: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
