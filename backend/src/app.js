//Packages
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require("./routes/index");

const app = express();

// Middlewares
app.use(cors({}));
app.use(helmet());
app.use(morgan("common"));
app.use(express.json({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

// Routes
app.use("/api", routes);

app.get("/", (_, res) => {
  res.status(200).send("Backend Service Running!");
});

module.exports = app;
