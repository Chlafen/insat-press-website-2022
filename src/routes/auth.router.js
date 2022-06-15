const express = require('express');
const { check } = require('express-validator');  
const { authController } = require('../controllers');
const { authMiddleware, verifyAccess } = require('../middlewares/auth');

const router = express.Router();

router.route('/login')
  .post(
    authMiddleware,
    verifyAccess(-1), // Guest
    authController.login,
  );

router.route('/verify/*')
  .get(
    authMiddleware,
    authController.verifyEmail,
  );

module.exports = router;