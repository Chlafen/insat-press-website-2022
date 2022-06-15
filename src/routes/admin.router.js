const express = require('express');
const { check } = require('express-validator'); 
const { auth } = require("../middlewares");
const { adminController } = require('../controllers');

const router = express.Router();

router.route('/')
  .get(
    auth.isUserAuthed,
    auth.verifyAccess(1), // Administrator
    adminController.allowAccess
  );

module.exports = router;
