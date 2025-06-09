import db from "../lib/db.mjs";

/**
 * FAQs model for interacting with the faqs table in the database.
 * Provides methods to retrieve FAQ data.
 * @module Faqs
 * @property {Function} getAll - Retrieves all FAQs from the database.
 */
export default class Faqs {
  /**
   * Retrieves all FAQs from the database.
   * @returns {Promise<Array>} A promise that resolves to an array of FAQ objects.
   */
  static getAll() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM faqs", [], (err, rows) => {
        if (err) {
          console.error("Error fetching FAQs: ", err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}
