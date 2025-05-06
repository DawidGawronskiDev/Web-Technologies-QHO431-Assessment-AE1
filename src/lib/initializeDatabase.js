const instructorsQuery = `
    CREATE TABLE IF NOT EXISTS instructors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        title TEXT NOT NULL,
        bio TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        profile_img TEXT NOT NULL,
        specialization TEXT NOT NULL
    )
`;

const coursesQuery = `
    CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        duration TEXT NOT NULL,
        instructor_id INTEGER NOT NULL,
        image TEXT NOT NULL,
        level TEXT NOT NULL,
        FOREIGN KEY (instructor_id) REFERENCES instructors(id)
)`;

const eventsQuery = `
    CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        event_date TEXT NOT NULL,
        event_type TEXT NOT NULL,
        instructor_id INTEGER NOT NULL,
        course_id INTEGER NOT NULL,
        location TEXT NOT NULL,
        duration TEXT NOT NULL,
        FOREIGN KEY (instructor_id) REFERENCES instructors(id),
        FOREIGN KEY (course_id) REFERENCES courses(id)
)`;

const faqsQuery = `
    CREATE TABLE IF NOT EXISTS faqs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        category TEXT NOT NULL
)`;

function initializeDatabase(db) {
  db.exec(instructorsQuery, (err) => {
    err
      ? console.error("Error creating instructors table: " + err.message)
      : console.log("Instructors table created or already exists.");
  });

  db.exec(coursesQuery, (err) => {
    err
      ? console.error("Error creating courses table: " + err.message)
      : console.log("Courses table created or already exists.");
  });

  db.exec(eventsQuery, (err) => {
    err
      ? console.error("Error creating events table: " + err.message)
      : console.log("Events table created or already exists.");
  });

  db.exec(faqsQuery, (err) => {
    err
      ? console.error("Error creating faqs table: " + err.message)
      : console.log("FAQs table created or already exists.");
  });

  return db;
}

module.exports = initializeDatabase;
