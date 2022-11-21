const express = require('express');
const { categoryController } = require('../controllers');
const { authMiddleware } = require('../middlewares/auth');

const router = express.Router();

router.route('/')
  .get(
    authMiddleware, 
    categoryController.getAll
  )


module.exports = router;
