const express = require("express");

/**
 * Config
 */
const port = 3000;

/**
 * Initializes the express application.
 */
const app = express();

/**
 * Routes
 */
app.get("/", (req, res) => {
  res.send("Hello World!");
});

/**
 * Server
 */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
