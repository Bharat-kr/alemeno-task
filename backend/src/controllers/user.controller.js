const {
  serverErrorResponse,
  successResponse,
  unprocessableEntityResponse,
  notFoundResponse,
  createdSuccessResponse,
  badRequestResponse,
} = require("../utils/response");
const bcrypt = require("bcrypt");
const dbService = require("../services/dbService");
const logger = require("../utils/logger");
const DB_MODELS = require("../utils/modelEnums");
const jwtHelper = require("../helpers/jwt");

const getUser = async (req, res) => {
  try {
    return successResponse(res, "User Fetched SuccessFully", req.user);
  } catch (error) {
    logger.error(`Error While getting User : ${error.message}`);
    return serverErrorResponse(res, "Error while getting User!");
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //match passwords
    if (!email) unprocessableEntityResponse(res, "email not found");
    if (!password) unprocessableEntityResponse(res, "password not found");

    const [userFound, userErr] = await dbService.find({
      model: DB_MODELS.USER,
      query: {
        email,
      },
    });
    if (userErr) return notFoundResponse(res, "User Not Found");

    if (!bcrypt.compareSync(password, userFound.password))
      return unauthorizedResponse(
        res,
        "Password does not match. Kindly retry."
      );

    const accessToken = jwtHelper.generate({
      _id: userFound._id,
      name: userFound.name,
      email: userFound.email,
    });

    delete userFound.password;
    delete userFound.createdAt;
    delete userFound.updatedAt;

    return successResponse(res, "Login successful", {
      ...userFound,
      accessToken,
    });
  } catch (error) {
    logger.error(`Error While login : ${error.message}`);
    return serverErrorResponse(res, "Error while login!");
  }
};
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email) return unprocessableEntityResponse(res, "email not found");
    if (!password)
      return unprocessableEntityResponse(res, "password not found");
    if (!name) return unprocessableEntityResponse(res, "name not found");
    const [userRes, userErr] = await DB_MODELS.USER.create({
      name,
      email,
      password,
    });
    if (userErr) return serverErrorResponse(res, userErr);
    logger.success("User created successfully!");
    return createdSuccessResponse(res, "User Created successfully", userRes);
  } catch (error) {
    logger.error(`Error While Signup : ${error.message}`);
    return serverErrorResponse(res, "Error while Signup!");
  }
};

const userController = {
  getUser,
  login,
  signup,
};

module.exports = userController;
