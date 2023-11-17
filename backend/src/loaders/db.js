const mongoose = require("mongoose");
const config = require("../config/index.js");

let connection;

module.exports = {
  async getConnection() {
    if (!connection) {
      connection = await mongoose.connect(config.databaseURL, {
        useNewUrlParser: true,
        useCreateIndex: true,
      });
    }
    return connection;
  },
};
