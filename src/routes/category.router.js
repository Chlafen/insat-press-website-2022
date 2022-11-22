const express = require('express');
const { categoryController } = require('../controllers');
const { isUserAuthed } = require('../middlewares/auth');

const router = express.Router();

router.route('/')
  .get(
    isUserAuthed, 
    categoryController.getAll
  )


module.exports = router;
