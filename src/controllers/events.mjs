import Event from "../models/event.mjs";
import Instructor from "../models/instructor.mjs";

export async function getEvents(req, res) {
  try {
    const events = await Event.getAll();

    res.render("events", {
      title: "Live Sessions & Special Events Schedule Page",
      description:
        "Stay tuned for more workshops and guest sessions throughout the term!",
      events,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching events" });
  }
}

export async function getEventById(req, res) {
  try {
    const event = await Event.getEventById(req.params.id);
    if (!event) {
      throw new Error("Event not found");
    }

    const instructor = await Instructor.getInstructor(event.instructor_id);
    if (!instructor) {
      throw new Error("Instructor not found");
    }

    res.render("event", {
      title: event.name,
      description: event.description,
      event,
      instructor,
    });
  } catch (error) {
    throw new Error("Error fetching event details: " + error.message);
  }
}
