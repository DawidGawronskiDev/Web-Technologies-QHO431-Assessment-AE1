import db from "../lib/db.mjs";

/**
 * Event model for interacting with the events table in the database.
 * Provides methods to retrieve event data.
 * @module Event
 * @property {Function} getAll - Retrieves all events from the database.
 * @property {Function} getEventByInstructorId - Retrieves events by instructor ID.
 */
export default class Event {
  /**
   * Retrieves all events from the database.
   * @returns {Promise<Array>} A promise that resolves to an array of event objects.
   */
  static getAll() {
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

  /**
   * Retrieves an event by its ID.
   * @param {number} eventId - The ID of the event to retrieve.
   * @returns {Promise<Object>} A promise that resolves to an event object.
   */
  static getEventByInstructorId(instructorId) {
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
}
