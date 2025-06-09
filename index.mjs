import express from "express";

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
app.set("views", "./views");

/**
 * Public folder
 */
app.use(express.static("./public"));

/**
 * Routes
 */
import indexRoutes from "./routes/index.mjs";
import coursesRoutes from "./routes/courses.mjs";
import instructorsRoutes from "./routes/instructors.mjs";
import eventsRoutes from "./routes/events.mjs";
import faqsRoutes from "./routes/faqs.mjs";
import contactRoutes from "./routes/contact.mjs";

app.get("/", indexRoutes);
app.use("/courses", coursesRoutes);
app.use("/instructors", instructorsRoutes);
app.use("/events", eventsRoutes);
app.use("/faqs", faqsRoutes);
app.use("/contact", contactRoutes);

app.use("/game", (req, res) => {
  res.render("game");
});

/**
 * Error handling
 */
app.use((err, req, res, next) => {
  console.error("Error: ", err.message);
  res.status(500).render("error");
});

/**
 * Server
 */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
