const express = require('express');
const { check } = require('express-validator');  
const { authController } = require('../controllers');
const { isUserAuthed, verifyAccess } = require('../middlewares/auth');

const router = express.Router();

router.route('/login')
  .post(
    isUserAuthed,
    verifyAccess(-1), // Guest
    authController.login,
  );

router.route('/verify/*')
  .get(
    isUserAuthed,
    authController.verifyEmail,
  );

module.exports = router;