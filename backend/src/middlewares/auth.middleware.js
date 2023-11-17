//helpers
const jwtHelper = require("../helpers/jwt");
const dbService = require("../services/dbService");

//utils
const logger = require("../utils/logger");
const DB_MODELS = require("../utils/modelEnums");
const { unauthorizedResponse } = require("../utils/response");

const authToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    console.log(token);
    if (!token) return unauthorizedResponse(res, "Unauthorized access");
    token = token.split(" ")[1];
    const decodedToken = await jwtHelper.verify(token);
    const { _id } = decodedToken;

    //find user in db
    const [user, userErr] = await dbService.findById(DB_MODELS.USER, _id);
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
