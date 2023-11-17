const express = require("express");
const courseController = require("../controllers/course.controller");
const middlewares = require("../middlewares");

const router = express.Router();

router.get("/:page", courseController.getAllCourses);
router.get("/:course_id", courseController.getCourseDetails);
router.post("/", courseController.createCourse);
router.post(
  "/enroll/:course_id",
  middlewares.authToken,
  courseController.enrollInCourse
);
router.get("/get_enrolled_courses", courseController.getEnrolledCourses); //need to be fixed
router.post(
  "/mark_as_completed/:course_id",
  middlewares.authToken,
  courseController.markAsCompleted
);

module.exports = router;
