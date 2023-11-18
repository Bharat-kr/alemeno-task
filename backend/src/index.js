require("dotenv").config({ path: `./.env` });
const http = require("http");

const app = require("./app");
const config = require("./config");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

const server = http.createServer(app);
const port = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV || "development";

const startServer = async () => {
  try {
    await mongoose.connect(config.databaseURL, {
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    logger.success(`🚀 DATABASE INITIALISED`);
    server.listen(port, () =>
      logger.success(
        `🛡️ BACKEND-SERVICE (http) LISTENING ON PORT:${port} ENV:${NODE_ENV}`
      )
    );
  } catch (error) {
    logger.error(error.message);
  }
};

startServer();
