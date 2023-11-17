const express = require("express");
const courseController = require("../controllers/course.controller");

const router = express.Router();

router.get("/", courseController.getAllCourses);

module.exports = router;
