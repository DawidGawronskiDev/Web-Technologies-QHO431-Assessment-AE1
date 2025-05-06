const sqlite = require("sqlite3");
const path = require("path");
const initializeDatabase = require("./initializeDatabase.js");

const dbPath = path.join(__dirname, "..", "db", "db.db");

const db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE, (err) => {
  if (err) {
    console.error("Error opening database " + err.message);
    createDatabase();
  } else {
    console.log("Connected to the database.");
    initializeDatabase(db);
  }
});

function createDatabase() {
  const newDb = new sqlite.Database(dbPath, (err) => {
    if (err) {
      console.error("Error opening database " + err.message);
      return;
    }
    console.log("Database created successfully.");
    initializeDatabase(newDb);
  });
}

module.exports = db;
