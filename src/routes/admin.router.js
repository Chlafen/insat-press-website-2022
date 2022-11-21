const express = require('express');
const { check } = require('express-validator'); 
const { auth, checkExistence } = require("../middlewares");
const { adminController, userController } = require('../controllers');

const router = express.Router();

const ADMIN_ROLE_ID = 1;

router.route('/')
  .get(
    auth.authMiddleware,
    auth.verifyAccess(ADMIN_ROLE_ID),
    adminController.allowAccess
  );

router.route('/users/new')
  .get(
    check('username', 'Please include a valid username').isLength({ min: 5 }),
    check('password', 'Please enter a password with 5 or more characters').isLength({ min: 7 }),
    checkExistence,
    auth.authMiddleware,
    auth.verifyAccess(ADMIN_ROLE_ID),
    userController.register
  );

router.route('/users')
  .get(
    auth.authMiddleware,
    auth.verifyAccess(ADMIN_ROLE_ID),
    adminController.listUsers
  );

module.exports = router;
