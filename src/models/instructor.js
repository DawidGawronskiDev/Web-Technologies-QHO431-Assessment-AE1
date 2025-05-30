const db = require("../lib/db");

module.exports = class Instructor {
  static async getAll() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM instructors", [], (err, rows) => {
        if (err) {
          console.error("Error fetching instructors: ", err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static async getInstructor(instructorId) {
    return new Promise((resolve, reject) => {
      db.get(
        "SELECT * FROM instructors WHERE id = ?",
        [instructorId],
        (err, row) => {
          if (err) {
            console.error("Error fetching instructor: ", err.message);
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });
  }
};
