const Event = require("../models/event");

async function getEvents(req, res) {
  try {
    const events = await Event.getAll();
    res.status(200).json({ data: events }, { status: 200 });
  } catch (error) {
    res.status(500).json({ message: "Error fetching events" });
  }
}

module.exports = {
  getEvents,
};
