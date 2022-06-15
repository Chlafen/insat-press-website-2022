const express = require('express');
const { check } = require('express-validator'); 
const { userController } = require('../controllers');
const {checkExistence} = require("../middlewares");
const { authMiddleware } = require('../middlewares/auth');


const router = express.Router();

router.route('/userinfo')
  .get(
    authMiddleware,
    userController.userInfo
  );
  
  
  router.route('/register')
  .post(
    check('username', 'Please include a valid username').isLength({ min: 5 }),
    check('password', 'Please enter a password with 5 or more characters').isLength({ min: 7 }),
    checkExistence,
    userController.register
    );
    
router.route('/:id')
  .get(userController.getOneUser);
// router.route('/authors')
//   .get(userController.getAuthors);

// router.route('/webmasters')
//   .get(userController.getWebmasters);

// router.route('photographers')
//   .get(userController.getPhotographers);

// router.route('/:id/posts')
//   .get(userController.getUserPosts);
    
    
    
    
module.exports = router;
