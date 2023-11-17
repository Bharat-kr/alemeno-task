const course = require("../models/course");
const user = require("../models/user");

const DB_MODELS = {
  USER: user,
  COURSE: course,
};

module.exports = DB_MODELS;
