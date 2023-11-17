const {
  serverErrorResponse,
  badRequestResponse,
  successResponse,
  unprocessableEntityResponse,
} = require("../utils/response");
const dbService = require("../services/dbService");
const logger = require("../utils/logger");
const DB_MODELS = require("../utils/modelEnums");

const getUser = async () => {
  try {
  } catch (error) {
    console.log(error);
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //match passwords
    if (!email) unprocessableEntityResponse(res, "email not found");
    if (!password) unprocessableEntityResponse(res, "password not found");

    const user = await dbService.find(user, { email });

    const accessToken = jwtHelper.generate({
      user_id: user.user_id,
      first_name: user.first_name,
      role: user.role,
      primary_email: user.primary_email,
      company_id: user.company_id,
    });

    delete user.password;
    delete user.created_at;
    delete user.updated_at;

    return successResponse(res, "Login successful", { ...user, accessToken });
  } catch (error) {
    logger.error(`Error While login : ${error.message}`);
    return serverErrorResponse(res, "Error while login!");
  }
};
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email) unprocessableEntityResponse(res, "email not found");
    if (!password) unprocessableEntityResponse(res, "password not found");
    if (!name) unprocessableEntityResponse(res, "name not found");
    const [userRes, userErr] = await dbService.create(DB_MODELS.USER, {
      name,
      email,
      password,
    });
    if (userErr) return serverErrorResponse(res, userErr);
    logger.info("User created successfully!");
    return successResponse(res, "User Created successfully", userRes);
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
