const parse = require('./parse');
const clean = require('./clean');
const stringify = require('./stringify');
const encode = require('./encode');
const decode = require('./decode');

const JsonHelper = {
  parse,
  clean,
  stringify,
  encode,
  decode,
};

module.exports = JsonHelper;
