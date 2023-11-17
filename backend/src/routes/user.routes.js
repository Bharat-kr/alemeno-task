const express = require("express");
const userController = require("../controllers/user.controller");
const middlewares = require("../middlewares");

const router = express.Router();

router.get("/", middlewares.authToken, userController.getUser);
router.post("/login", userController.login);
router.post("/signup", userController.signup);

module.exports = router;
