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

  static async getCourseById(courseId) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM courses WHERE id = ?", [courseId], (err, row) => {
        if (err) {
          console.error("Error fetching course: ", err.message);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static async getCoursesByInstructorId(instructorId) {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT * FROM courses WHERE instructor_id = ?",
        [instructorId],
        (err, rows) => {
          if (err) {
            console.error(
              "Error fetching courses by instructor ID: ",
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
