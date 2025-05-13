const db = require("../lib/db");

module.exports = class Event {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM events", [], (err, rows) => {
        if (err) {
          console.error("Error fetching events: ", err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
};
