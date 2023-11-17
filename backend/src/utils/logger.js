const colors = require("colors");
colors.enable();

const error = (msg) => {
  console.error(`${msg}`.red);
};
const success = (msg) => {
  console.error(`${msg}`.green);
};
const info = (msg) => {
  console.error(`${msg}`.blue);
};
const warning = (msg) => {
  console.error(`${msg}`.yellow);
};

const logger = {
  error,
  success,
  info,
  warning,
};

module.exports = logger;
