const express = require('express');
const { check } = require('express-validator'); 
const { postController } = require('../controllers');

const router = express.Router();


router.route('/')
.post(postController.createPost)

router.route('/category/:slug')
.get(postController.getPostsByCategory)

router.route('/videos')
.get(postController.getVideos)

router.route('/:id')
  .get(postController.getSinglePost)
  
router.route('/latest/:limit')
  .get(postController.getLatest)

module.exports = router;
