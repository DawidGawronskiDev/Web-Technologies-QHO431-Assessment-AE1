const db = require("./db");
const { instructors, courses, events, faqs } = require("../data/seed");

async function seedDatabase(db) {
  try {
    db.exec("BEGIN TRANSACTION;");

    /**
     * Instructors
     */
    const instructorIds = new Map();
    for (const instructor of instructors) {
      const result = await new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO instructors (name, title, bio, email, profile_img, specialization) VALUES (?, ?, ?, ?, ?, ?)`,
          [
            instructor.name,
            instructor.title,
            instructor.bio,
            instructor.email,
            instructor.profile_img,
            instructor.specialization,
          ],
          function (err) {
            if (err) {
              console.error("Error inserting instructor: ", err.message);
              reject(err);
            } else {
              resolve(this.lastID);
            }
          }
        );
      });
      instructorIds.set(instructor.name, result);
    }

    /**
     * Courses
     */
    const courseIds = new Map();
    for (const course of courses) {
      const result = await new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO courses (name, description, duration, instructor_id, image, level) VALUES (?, ?, ?, ?, ?, ?)`,
          [
            course.name,
            course.description,
            course.duration,
            instructorIds.get(course.instructor_name),
            course.image,
            course.level,
          ],
          function (err) {
            if (err) {
              console.error("Error inserting course: ", err.message);
              reject(err);
            } else {
              resolve(this.lastID);
            }
          }
        );
      });
      courseIds.set(course.name, result);
    }

    /**
     * Events
     */
    for (const event of events) {
      await new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO events (title, description, event_date, event_type, instructor_id, course_id, location, duration) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            event.title,
            event.description,
            event.event_date,
            event.event_type,
            instructorIds.get(event.instructor_name),
            courseIds.get(event.course_name),
            event.location,
            event.duration,
          ],
          function (err) {
            if (err) {
              console.error("Error inserting event: ", err.message);
              reject(err);
            } else {
              resolve(this.lastID);
            }
          }
        );
      });
    }

    /**
     * FAQs
     */
    for (const faq of faqs) {
      await new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO faqs (question, answer, category) VALUES (?, ?, ?)`,
          [faq.question, faq.answer, faq.category],
          function (err) {
            if (err) {
              console.error("Error inserting FAQ: ", err.message);
              reject(err);
            } else {
              resolve(this.lastID);
            }
          }
        );
      });
    }

    console.log("Database seeded successfully.");

    db.exec("COMMIT;");
  } catch (error) {
    console.error("Error seeding database: ", error.message);
    db.exec("ROLLBACK;");
  }
}

function main() {
  seedDatabase(db);
}

main();
