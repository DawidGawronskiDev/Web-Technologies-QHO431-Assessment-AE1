const db = require("../lib/db");

module.exports = class Event {
  static async getAll() {
    return new Promise((resolve, reject) => {
      db.all(
        `
        SELECT
          e.*,
          i.name AS instructor_name,
          c.name AS course_name
        FROM events e 
        JOIN instructors i 
          ON i.id = e.instructor_id
        JOIN courses c
          ON c.id = e.course_id;`,
        [],
        (err, rows) => {
          if (err) {
            console.error("Error fetching events: ", err.message);
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  static async getEventByInstructorId(instructorId) {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT e.*, i.name AS instructor_name FROM events e JOIN instructors i ON i.id = e.instructor_id  WHERE instructor_id = ?",
        [instructorId],
        (err, rows) => {
          if (err) {
            console.error(
              "Error fetching events by instructor ID: ",
              err.message
            );
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }
};
