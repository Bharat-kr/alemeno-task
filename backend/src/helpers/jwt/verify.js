const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/index.js");

const verify = (accessToken) => {
  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET);
    return {
      valid: true,
      ...decoded,
    };
  } catch (e) {
    return {
      valid: false,
    };
  }
};

module.exports = verify;
