const logger = require("../utils/logger");

const dbService = {
  async find({
    model,
    query,
    projection = { __v: 0 },
    sort = { _id: 1 },
    options = { lean: true },
  }) {
    try {
      const res = await model
        .find(query, projection, options)
        .sort(sort)
        .select({ __v: 0 })
        .exec();
      return [res[0], null];
    } catch (error) {
      logger.error("Error in dbService find", error);
      return [null, error];
    }
  },
  async findAll({
    model,
    query,
    projection = { __v: 0 },
    sort = { _id: 1 },
    options = { lean: true },
  }) {
    try {
      const res = await model
        .find(query, projection, options)
        .sort(sort)
        .select({ __v: 0 })
        .exec();
      return [res, null];
    } catch (error) {
      logger.error("Error in dbService find", error);
      return [null, error];
    }
  },

  async findById(model, id) {
    try {
      const res = await model.findById(id);
      return [res, null];
    } catch (error) {
      logger.error("Error in dbService findById", error);
      return [null, error];
    }
  },

  async create(model, data) {
    try {
      const res = await model.create(data);
      return [res, null];
    } catch (error) {
      logger.error("Error in dbService Create", error);
      return [null, error];
    }
  },

  async createMany(model, dataArray) {
    try {
      const res = await model.insertMany(dataArray);
      return [res, null];
    } catch (error) {
      logger.error("Error in dbService CreateMany", error);
      return [null, error];
    }
  },

  async update(model, id, updateData) {
    try {
      const res = await model.findByIdAndUpdate(id, updateData);
      return [res, null];
    } catch (error) {
      logger.error("Error in dbService Update", error);
      return [null, error];
    }
  },

  async updateMany(model, query, updateData) {
    try {
      const res = await model.updateMany(query, updateData);
      return [res, null];
    } catch (error) {
      logger.error("Error in dbService UpdateMany", error);
      return [null, error];
    }
  },

  async delete(model, id) {
    try {
      const res = await model.findByIdAndDelete(id);
      return [res, null];
    } catch (error) {
      logger.error("Error in dbService Delete", error);
      return [null, error];
    }
  },

  async deleteMany(model, query) {
    try {
      const res = await model.deleteMany(query);
      return [res, null];
    } catch (error) {
      logger.error("Error in dbService DeleteMany", error);
      return [null, error];
    }
  },
};

module.exports = dbService;
