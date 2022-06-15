const express = require('express');
const { check } = require('express-validator'); 
const { postController } = require('../controllers');
const { authMiddleware } = require('../middlewares/auth');

const router = express.Router();

router.route('/:id')
  .get(
    authMiddleware,
    postController.getSinglePost
  )

router.route('/')
  .post(
    authMiddleware,
    postController.createPost
  )

router.route('/category/:slug')
  .get(
    authMiddleware,
    postController.getPostsByCategory
  )

module.exports = router;
