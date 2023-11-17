const express = require("express");
const config = require("./config/index.js"); //TODO: Why can't i leave out the /index.js part?
const loaders = require("./loaders/index.js");

async function startServer() {
  const app = express();

  loaders(app).catch((e) => {
    console.log("AN ERROR OCCURED!");
    throw e; // TODO: sensible error handling
  });
}

startServer();
