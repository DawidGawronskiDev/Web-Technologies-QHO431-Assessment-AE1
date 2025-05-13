const db = require("../lib/db");

async function getEvents(req, res) {
  try {
    const events = await new Promise((resolve, reject) => {
      db.all("SELECT * FROM events", [], (err, rows) => {
        if (err) {
          console.error("Error fetching events: ", err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    res.status(200).json({ data: events }, { status: 200 });
  } catch (error) {
    res.status(500).json({ message: "Error fetching events" });
  }
}

module.exports = {
  getEvents,
};
