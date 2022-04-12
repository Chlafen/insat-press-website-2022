const express = require('express');
const { check } = require('express-validator'); 
const { postController } = require('../controllers');

const router = express.Router();

router.route('/:id').get(postController.getSinglePost)

router.route('/').post(postController.createPost)


module.exports = router;
