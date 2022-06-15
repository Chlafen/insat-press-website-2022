const checkExistence = require("./checkExistence");
const {mailTo} = require("./sendEmail");
const auth = require('./auth');

module.exports = {
  checkExistence,
  mailTo,
  auth
};