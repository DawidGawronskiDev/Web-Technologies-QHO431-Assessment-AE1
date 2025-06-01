const db = require("../lib/db");

/**
 * Instructor model for interacting with the instructors table in the database.
 * Provides methods to retrieve instructor data.
 * @module Instructor
 * @property {Function} getAll - Retrieves all instructors from the database.
 * @property {Function} getInstructor - Retrieves an instructor by their ID.
 */
class Instructor {
  /**
   * Retrieves all instructors from the database.
   * @returns {Promise<Array>} A promise that resolves to an array of instructor objects.
   */
  static getAll() {
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

  /**
   * Retrieves an instructor by their ID.
   * @param {number} instructorId - The ID of the instructor to retrieve.
   * @returns {Promise<Object>} A promise that resolves to an instructor object.
   */
  static getInstructor(instructorId) {
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
}

module.exports = Instructor;
