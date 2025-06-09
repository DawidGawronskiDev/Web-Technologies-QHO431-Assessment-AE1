import sqlite from "sqlite3";
import initializeDatabase from "./initializeDatabase.mjs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    z;
    console.log("Database created successfully.");
    initializeDatabase(newDb);
  });
}

export default db;
