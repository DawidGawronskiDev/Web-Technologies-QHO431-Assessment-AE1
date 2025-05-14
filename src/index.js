const express = require("express");
const path = require("path");

/**
 * Config
 */
const port = 5000;

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
 * Public folder
 */
app.use(express.static(path.join(__dirname, "public")));

/**
 * Routes
 */
const apiRoutes = require("./routes/api/v1/index");

app.use("/api/v1", apiRoutes);

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

/**
 * Server
 */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
