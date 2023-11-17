const dotenv = require("dotenv");

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process
  throw new Error("Couldn't find .env file");
}

module.exports = {
  /**
   * Your favorite port
   */
  PORT: parseInt(process.env.PORT, 10),
  API: {
    PREFIX: "/api",
  },
  databaseURL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};
