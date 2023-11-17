const expressLoader = require("./express.js");
const mongooseLoader = require("./db.js");

module.exports = async (expressApp) => {
  //try to create connection
  await mongooseLoader.getConnection();
  console.log("MongoDB Intialized");
  expressLoader(expressApp);
  console.log("Express initialized");
};
