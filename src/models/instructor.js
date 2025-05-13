const db = require("../lib/db");

class Instructor {
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
}

module.exports = Instructor;
