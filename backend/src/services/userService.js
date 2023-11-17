const dbService = require("./dbService.js");
const user = require("../models/user.js");

const userService = {
  async getAllUsers() {
    return await dbService.find(user, {});
  },
  async getUserById(id) {
    return await dbService.findById(user, id);
  },
  async createUser(data) {
    return await dbService.create(user, data);
  },
};
module.exports = userService;
