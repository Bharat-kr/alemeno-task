
//helpers
const jwtHelper = require("../helpers/jwt");

//utils
const logger = require("../utils/logger");
const { unauthorizedResponse } = require("../utils/response");

const authToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) return unauthorizedResponse(res, "Unauthorized access");
    token = token.split(" ")[1];
    const decodedToken = await jwtHelper.verify(token);
    const { user_id } = decodedToken;

    //find user in db
    const user = await getUserById();
    if (!user || userErr)
      return unauthorizedResponse(res, "Unauthorized access");

    req.user = user;
    next();
  } catch (err) {
    logger.error(`Unable to verify token: ${err}`);
    return unauthorizedResponse(res, "Unauthorized access");
  }
};

module.exports = authToken;
