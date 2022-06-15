const express = require("express");

const router = express.Router();

router.use('/posts', require('./post.router'));
router.use('/users', require('./user.router'));
router.use('/auth',  require('./auth.router'));
router.use('/admin',  require('./admin.router'));
router.use('/categories', require('./category.router'));


module.exports = router