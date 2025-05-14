const Event = require("../models/event");

/**
 * @description Get all events
 * @route GET /api/v1/events
 * @access Public
 */
async function getEvents(req, res) {
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

module.exports = {
  getEvents,
};
