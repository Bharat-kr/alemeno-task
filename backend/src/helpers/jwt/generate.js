const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/index.js");

const generate = (data) => {
  return jwt.sign(data, JWT_SECRET);
};

module.exports = generate;
