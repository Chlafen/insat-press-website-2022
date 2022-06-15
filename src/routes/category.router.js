const express = require('express');
const { categoryController } = require('../controllers');

const router = express.Router();

router.route('/')
  .get(categoryController.getAll)


module.exports = router;
