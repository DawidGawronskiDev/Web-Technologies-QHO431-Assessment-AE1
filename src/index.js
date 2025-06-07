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
 * Middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
const indexRoutes = require("./routes/index");
const coursesRoutes = require("./routes/courses");
const instructorsRoutes = require("./routes/instructors");
const eventsRoutes = require("./routes/events");
const faqsRoutes = require("./routes/faqs");
const contactRoutes = require("./routes/contact");

app.get("/", indexRoutes);
app.use("/courses", coursesRoutes);
app.use("/instructors", instructorsRoutes);
app.use("/events", eventsRoutes);
app.use("/faqs", faqsRoutes);
app.use("/contact", contactRoutes);

app.use("game", (req, res) => {
  res.render("game");
});

/**
 * Server
 */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
