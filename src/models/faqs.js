const db = require("../lib/db");

module.exports = class Faqs {
  static async getAll() {
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
};
