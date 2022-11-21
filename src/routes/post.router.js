const express = require('express');
const { check } = require('express-validator'); 
const { postController } = require('../controllers');
const { getUserId } = require('../middlewares/auth');
const router = express.Router();

// router.route('/')
// .post(postController.createPost)

router.route('/category/:slug')
.get(postController.getPostsByCategory)

router.route('/videos')
.get(postController.getVideos)

  
router.route('/latest/:start/:limit')
  .get(postController.getLatest)

router.route('/view/:start/:limit')
  .get(postController.getPopular)

router.route('/user')
  .get(
    getUserId,
    postController.getPostsByUser
  )

router.route('/drafts')
  .post(postController.createPost)

  
router.route('/:id')
  .put(postController.publishPost)
  
router.route('/:id')
  .get(postController.getSinglePost)

router.route('/:id')
  .delete(postController.deletePost)

module.exports = router;
