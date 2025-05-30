const db = require("../lib/db");

module.exports = class Course {
  static async getAll() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM courses", [], (err, rows) => {
        if (err) {
          console.error("Error fetching courses: ", err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
};
