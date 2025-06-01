const db = require("../lib/db");

/**
 * Course model for interacting with the courses table in the database.
 * Provides methods to retrieve course data.
 * @module Course
 * @property {Function} getAll - Retrieves all courses from the database.
 * @property {Function} getCourseById - Retrieves a course by its ID.
 * @property {Function} getCoursesByInstructorId - Retrieves courses by instructor ID.
 */
class Course {
  /**
   * Retrieves all courses from the database.
   * @returns {Promise<Array>} A promise that resolves to an array of course objects.
   */
  static getAll() {
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

  /**
   * Retrieves a course by its ID.
   * @param {number} courseId - The ID of the course to retrieve.
   * @returns {Promise<Object>} A promise that resolves to a course object.
   */
  static getCourseById(courseId) {
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

  /**
   * Retrieves courses by instructor ID.
   * @param {number} instructorId - The ID of the instructor whose courses to retrieve.
   * @returns {Promise<Array>} A promise that resolves to an array of course objects.
   */
  static getCoursesByInstructorId(instructorId) {
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
}

module.exports = Course;
