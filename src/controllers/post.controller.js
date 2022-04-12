const { Post } = require('../models');
const {asyncHandler, responseHandler} = require('../helpers/handlers');
const { postService } = require('../services');
const { DataTypes } = require('sequelize');
const { formatDate } = require('../utils');
const { createHash } = require('crypto');

exports.getSinglePost = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id || -1;
    await postService.retrieveOne(id,(err, data) => {
      if(err) {
        return res.status(err.code).json(err);
        console.log("test");
      }
      return res.status(data.code).json(data);
    });
  }catch(error) {
    console.log(error);
    return res.status(error.code).json(error);
  }
});

exports.createPost = asyncHandler(async (req, res) => {
  try {
    const rq = req.body;
    const now = formatDate(new Date());
    const image_path = 'uploads/' + now.year + '/' + now.month + '/' +  createHash('sha256',now.date) + '.jpg';
    const post = new Post({
      post_content: rq.post_content,
      post_title: rq.post_title,
      author_id: rq.author_id,
      post_edit: DataTypes.NOW,
      post_date: DataTypes.NOW,
      type: rq.type,
      view_count: 1,
      image_path: image_path,
    });
    await postService.createPost(post,(err, data) => {
      if(err) {
        return res.status(err.code).json(err);
      }
      return res.status(data.code).json(data);
    });
  }catch(error) {
    console.log(error);
    return res.status(error.code).json(error);
  }
});