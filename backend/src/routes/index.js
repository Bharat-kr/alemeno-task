const express = require("express");
const courseRoutes = require("./course.routes");
const userRoutes = require("./user.routes");
const router = express.Router();

router.use("/user", userRoutes);
router.use("/course", courseRoutes);

module.exports = router;
