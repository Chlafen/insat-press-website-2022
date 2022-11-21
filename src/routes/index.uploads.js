const express = require("express");

const router = express.Router();

router.use('/', require('./uploads.router'));

module.exports = router