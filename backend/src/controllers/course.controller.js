const dbService = require("../services/dbService");
const logger = require("../utils/logger");
const DB_MODELS = require("../utils/modelEnums");
const {
  serverErrorResponse,
  successResponse,
  badRequestResponse,
} = require("../utils/response");

const getAllCourses = async (req, res) => {
  try {
    const { page } = req.params;
    const [courses, coursesErr] = await dbService.findAll({
      model: DB_MODELS.COURSE,
      options: { limit: 10, skip: 10 * (page - 1) },
    });
    if (coursesErr)
      return serverErrorResponse(res, "Error While fetching Courses");
    return successResponse(res, "All Courses !", courses);
  } catch (error) {
    logger.error(`Error While getting Courses : ${error.message}`);
    return serverErrorResponse(res, "Error while getting Courses!");
  }
};
const createCourse = async (req, res) => {
  try {
    const data = req.body;
    const [course, courseErr] = await dbService.create(DB_MODELS.COURSE, data);
    if (courseErr)
      return serverErrorResponse(res, "Error While creating Course");
    return successResponse(res, "Course Created!", course);
  } catch (error) {
    logger.error(`Error While creating Course : ${error.message}`);
    return serverErrorResponse(res, "Error while creating Course!");
  }
};

const getCourseDetails = async (req, res) => {
  try {
    const { course_id } = req.params;
    const [course, courseErr] = await dbService.findById(
      DB_MODELS.COURSE,
      course_id
    );
    if (courseErr)
      return serverErrorResponse(res, "Error While fetching Course");
    return successResponse(res, "Course Details!", course);
  } catch (error) {
    logger.error(`Error While getting Courses : ${error.message}`);
    return serverErrorResponse(res, "Error while getting Courses!");
  }
};

const enrollInCourse = async (req, res) => {
  try {
    const { course_id } = req.params;
    const { _id } = req.user;
    const updatedCourse = await DB_MODELS.COURSE.findByIdAndUpdate(
      course_id,
      { $push: { students: _id } },
      { new: true }
    );
    const updatedStudent = await DB_MODELS.USER.findByIdAndUpdate(_id, {
      $push: { courses: course_id },
    });
    return successResponse(res, "Enrolling SuccessFull");
  } catch (error) {
    logger.error(`Error While getting Courses : ${error.message}`);
    return serverErrorResponse(res, "Error while getting Courses!");
  }
};

//TODO: Fix this
const getEnrolledCourses = async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    return successResponse(res, "All enrolled Courses !", user.courses);
  } catch (error) {
    logger.error(`Error While getting Courses : ${error.message}`);
    return serverErrorResponse(res, error.message);
  }
};

const markAsCompleted = async (req, res) => {
  try {
    const { course_id } = req.params;
    const { _id } = req.user;
    const updatedStudent = await DB_MODELS.USER.findByIdAndUpdate(
      _id,
      {
        $pull: { courses: course_id },
        $push: { completed_courses: course_id },
      },
      { new: true }
    );
    return successResponse(res, "Marked Completed!", updatedStudent);
  } catch (error) {
    logger.error(`Error While marking completed : ${error.message}`);
    return serverErrorResponse(res, error.message);
  }
};
const searchCourse = async (req, res) => {};

const courseController = {
  getAllCourses,
  getCourseDetails,
  enrollInCourse,
  getEnrolledCourses,
  markAsCompleted,
  searchCourse,
  createCourse,
};

module.exports = courseController;
