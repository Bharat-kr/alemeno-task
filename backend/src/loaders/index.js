const expressLoader = require("./express.js");
const mongooseLoader = require("./db.js");
const logger = require("../utils/logger.js");

module.exports = async (expressApp) => {
  //try to create connection
  await mongooseLoader.getConnection();
  logger.success("MongoDB Intialized  🚀🚀");
  expressLoader(expressApp);
  logger.success("Express initialized 🚀🚀");
};
