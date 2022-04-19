const express = require('express');
const { check } = require('express-validator'); 
const { userController } = require('../controllers');
const {checkExistence} = require("../middlewares");

const router = express.Router();

router.route('/:id')
  .get(userController.getOneUser);
 
router.route('/register')
  .post(
    check('username', 'Please include a valid username').isLength({ min: 5 }),
    check('password', 'Please enter a password with 5 or more characters').isLength({ min: 7 }),
    checkExistence,
    userController.register
  );

module.exports = router;
