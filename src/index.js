const express = require("express");
const path = require("path");

/**
 * Config
 */
const port = 3000;

/**
 * Initializes the express application.
 */
const app = express();

/**
 * View engine
 */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/**
 * Routes
 */
app.get("/", (req, res) => {
  res.render("index.ejs", {
    title: "Home",
    description: "Welcome to our online learning platform!",
  });
});

/**
 * Server
 */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
