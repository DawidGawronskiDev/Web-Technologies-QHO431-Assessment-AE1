const db = require("../lib/db");

/**
 * Message model for interacting with the messages table in the database.
 * Provides methods to create a new message.
 * @module Message
 * @property {Function} createMessage - Inserts a new message into the database.
 */
class Message {
  /**
   * Inserts a new message into the database.
   * @param {string} name - The name of the person sending the message.
   * @param {string} message - The content of the message.
   * @returns {Promise<Object>} A promise that resolves to the created message object, including its ID.
   */
  static createMessage(name, message) {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO messages (name, message) VALUES (?, ?)",
        [name, message],
        function (err) {
          if (err) {
            console.error("Error inserting message: ", err.message);
            reject(err);
          } else {
            resolve({ id: this.lastID, name, message });
          }
        }
      );
    });
  }
}

module.exports = Message;
