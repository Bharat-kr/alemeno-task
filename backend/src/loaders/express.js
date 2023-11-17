// import routes from "../api/index.js";
const config = require("../config/index.js");
const bodyParser = require("body-parser");
const routes = require("../routes/index.js");
const logger = require("../utils/logger.js");

module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(config.API.PREFIX, routes);

  app.get("/", (req, res) => {
    res.send("HELLO FELLOW DEVELOPERS!");
  });

  app.listen(config.PORT, (err) => {
    if (err) {
      process.exit(1);
      return;
    }
    logger.success(`🛡️ Server listening on port: ${config.PORT} 🛡️`);
  });
};
