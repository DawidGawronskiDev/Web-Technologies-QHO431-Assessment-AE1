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

  static getById(id) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM instructors WHERE id = ?", [id], (err, row) => {
        if (err) {
          console.error("Error fetching instructor: ", err.message);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
}

module.exports = Instructor;
