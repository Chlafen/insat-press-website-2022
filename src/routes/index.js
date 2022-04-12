const express = require("express");

const router = express.Router();



router.use('/posts', require('./post.router'));



module.exports = router