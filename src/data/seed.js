const currentYear = new Date().getFullYear();

const instructors = [
  {
    name: "Dr. Sarah Johnson",
    title: "Lead Web Development Instructor",
    bio: "Dr. Johnson has over 15 years of experience in web development and has worked with major tech companies before joining our platform. She specializes in modern JavaScript frameworks and responsive design.",
    email: "sarah.johnson@learning-platform.com",
    profile_img: "/images/instructors/sarah-johnson.jpg",
    specialization: "Web Development, JavaScript, React",
  },
  {
    name: "Prof. David Chen",
    title: "Senior Database Specialist",
    bio: "Professor Chen is an expert in database design and management with a PhD in Computer Science. He has authored three textbooks on SQL and database optimization techniques.",
    email: "david.chen@learning-platform.com",
    profile_img: "/images/instructors/david-chen.jpg",
    specialization: "Databases, SQL, Data Modeling",
  },
  {
    name: "Maria Rodriguez",
    title: "UX/UI Design Instructor",
    bio: "Maria brings 10 years of industry experience in user interface design. She previously worked as a lead designer for several startups and now enjoys teaching the next generation of designers.",
    email: "maria.rodriguez@learning-platform.com",
    profile_img: "/images/instructors/maria-rodriguez.jpg",
    specialization: "UI/UX Design, Wireframing, Prototyping",
  },
  {
    name: "James Wilson",
    title: "Back-End Development Instructor",
    bio: "James is a back-end development expert with extensive experience in Node.js and server architecture. He previously worked at Amazon Web Services before becoming an educator.",
    email: "james.wilson@learning-platform.com",
    profile_img: "/images/instructors/james-wilson.jpg",
    specialization: "Node.js, Express, Server Architecture",
  },
];

const courses = [
  {
    name: "Introduction to Web Development",
    description:
      "Learn the fundamentals of web development including HTML, CSS, and JavaScript. This course is perfect for beginners looking to start their journey in web development.",
    duration: "8 weeks",
    instructor_name: "Dr. Sarah Johnson",
    image: "/images/courses/web-dev-intro.jpg",
    level: "Beginner",
  },
  {
    name: "Advanced JavaScript Techniques",
    description:
      "Take your JavaScript skills to the next level with this advanced course covering closures, prototypes, ES6 features, and asynchronous programming.",
    duration: "10 weeks",
    instructor_name: "Dr. Sarah Johnson",
    image: "/images/courses/advanced-js.jpg",
    level: "Advanced",
  },
  {
    name: "Database Design and Management",
    description:
      "Learn how to design, implement, and optimize databases. This course covers relational database concepts, SQL, and best practices for database architecture.",
    duration: "6 weeks",
    instructor_name: "Prof. David Chen",
    image: "/images/courses/database-design.jpg",
    level: "Intermediate",
  },
  {
    name: "UX/UI Design Principles",
    description:
      "Discover the principles of effective user interface design. Learn to create intuitive and visually appealing interfaces that enhance user experience.",
    duration: "8 weeks",
    instructor_name: "Maria Rodriguez",
    image: "/images/courses/ux-ui-design.jpg",
    level: "Intermediate",
  },
  {
    name: "Building APIs with Node.js",
    description:
      "Master the art of building robust APIs using Node.js and Express. Learn RESTful principles, authentication, and how to structure large-scale applications.",
    duration: "12 weeks",
    instructor_name: "James Wilson",
    image: "/images/courses/node-apis.jpg",
    level: "Advanced",
  },
];

const events = [
  {
    title: "Web Development Q&A Session",
    description:
      "Join Dr. Johnson for a live Q&A session about web development. Get your questions answered by an expert!",
    event_date: `${currentYear}-06-15T18:00:00`,
    event_type: "Live Q&A",
    instructor_name: "Dr. Sarah Johnson",
    course_name: "Introduction to Web Development",
    location: "Online - Zoom",
    duration: "1 hour",
    is_past: 0,
  },
  {
    title: "Database Optimization Workshop",
    description:
      "A hands-on workshop where you will learn practical techniques to optimize database performance.",
    event_date: `${currentYear}-07-10T14:00:00`,
    event_type: "Workshop",
    instructor_name: "Prof. David Chen",
    course_name: "Database Design and Management",
    location: "Online - Zoom",
    duration: "2 hours",
    is_past: 0,
  },
  {
    title: "UX Design Principles Webinar",
    description:
      "Learn the fundamental principles of UX design in this informative webinar with Maria Rodriguez.",
    event_date: `${currentYear}-05-20T16:00:00`,
    event_type: "Webinar",
    instructor_name: "Maria Rodriguez",
    course_name: "UX/UI Design Principles",
    location: "Online - Zoom",
    duration: "1.5 hours",
    is_past: 0,
  },
  {
    title: "Node.js Best Practices",
    description:
      "Join James Wilson to learn about best practices when building Node.js applications.",
    event_date: `${currentYear - 1}-12-05T17:00:00`,
    event_type: "Lecture",
    instructor_name: "James Wilson",
    course_name: "Building APIs with Node.js",
    location: "Online - Zoom",
    duration: "1 hour",
    is_past: 1,
  },
  {
    title: "JavaScript Modern Frameworks Comparison",
    description:
      "A detailed comparison of modern JavaScript frameworks like React, Vue, and Angular.",
    event_date: `${currentYear - 1}-11-15T15:00:00`,
    event_type: "Panel Discussion",
    instructor_name: "Dr. Sarah Johnson",
    course_name: "Advanced JavaScript Techniques",
    location: "Online - Zoom",
    duration: "2 hours",
    is_past: 1,
  },
];

const faqs = [
  {
    question: "How do I enroll in a course?",
    answer:
      'To enroll in a course, navigate to the course details page and click on the "Enroll" button. Follow the instructions to complete your enrollment.',
    category: "Enrollment",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept all major credit cards, PayPal, and bank transfers. Payment details can be entered securely during the checkout process.",
    category: "Payment",
  },
  {
    question: "Can I access course materials after completion?",
    answer:
      "Yes, you will have lifetime access to all course materials after completing the course.",
    category: "Access",
  },
  {
    question: "Are there any prerequisites for courses?",
    answer:
      "Prerequisites vary by course. You can find specific prerequisites on each course details page.",
    category: "Enrollment",
  },
  {
    question: "How do I attend live sessions?",
    answer:
      "Live sessions are conducted via Zoom. You will receive a link to join the session via email before the scheduled time.",
    category: "Sessions",
  },
  {
    question: "Can I get a refund if I'm not satisfied?",
    answer:
      "Yes, we offer a 30-day money-back guarantee if you're not satisfied with the course.",
    category: "Payment",
  },
  {
    question: "How do I contact my instructor?",
    answer:
      "You can contact your instructor through the messaging system on the platform or via the email provided on their profile page.",
    category: "Communication",
  },
  {
    question: "Is there a mobile app available?",
    answer:
      "Yes, our mobile app is available for both iOS and Android devices. You can download it from the respective app stores.",
    category: "Access",
  },
];

module.exports = { instructors, courses, events, faqs };
