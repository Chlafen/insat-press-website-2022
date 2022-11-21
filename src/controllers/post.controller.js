const { Post } = require('../models');
const {asyncHandler, responseHandler} = require('../helpers/handlers');
const { postService, tagService } = require('../services');
const { DataTypes } = require('sequelize');
const { formatDate } = require('../utils');
const { createHash } = require('crypto');


exports.getSinglePost       = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id || -1;
    await postService.retrieveOne(id,(err, data) => {
      if(err) {
        return res.status(err.code).json(err);
      }
      return res.status(data.code).json(data);
    });
  }catch(error) {
    console.error(error)
    return res.status(error.code).json(error);
  }
});

exports.createPost          = asyncHandler(async (req, res) => {
  try {
    const rq = req.body;
    const now = formatDate(new Date());
    //insert image then post
    const post = new Post({
      post_content: rq.content,
      post_title: rq.title,
      author_id: rq.author_id,
      post_edit: now.date,
      post_date:  now.date,
      type: rq.type,
      view_count: 1,
      image_path: rq.image_path,
      categories: rq.categories,
      tags: rq.tags,
      attachments: rq.attachments
    });

    await postService.createPost(post,(err, data) => {
      if(err) {
        return res.status(err.code).json(err);
      }
      return res.status(data.code).json(data);
    });
  }catch(error) {
    console.error(error)
    return res.status(error.code).json(error);
  }
});

exports.getPostsByCategory  = asyncHandler(async (req, res) => {
  try{
    const slug = req.params.slug;
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 9;
    const offset = (page - 1) * limit;
    await postService.getPostsByCategory(slug, limit, offset, (err, data) => {
      if(err) {
        return res.status(err.code).json(err);
      }
      return res.status(data.code).json(data);
    });
  }catch(error) {
    console.error(error)
    return res.status(error.code).json(error);
  }
});

exports.getVideos           = asyncHandler(async (req, res) => {
  try{
    const limit = req.query.limit * 1 || 5;
    await postService.getVideos(limit, (err, data) => {
      if(err) {
        return res.status(err.code).json(err);
      }
      return res.status(data.code).json(data);
    });
  }catch(error) {
    console.error(error)
    return res.status(error.code).json(error);
  }
});

exports.getLatest           = asyncHandler(async (req, res) => {
  try{
    const limit = req.params.limit * 1 || 20;
    const start = req.params.start * 1 || 0;
    await postService.getLatest(start, limit, (err, data) => {
      if(err) {
        return res.status(err.code).json(err);
      }
      return res.status(data.code).json(data);
    });
  }catch(error) {
    console.error(error)
    return res.status(error.code).json(error);
  }
});

exports.getPopular          = asyncHandler(async (req, res) => {
  try{
    const limit = req.params.limit * 1;
    const start = req.params.start * 1;
    await postService.getPopular(start, limit, (err, data) => {
      if(err) {
        return res.status(err.code).json(err);
      }
      return res.status(data.code).json(data);
    });
  }catch(error) {
    console.error(error)
    return res.status(error.code).json(error);
  }
});

exports.getPostsByUser      = asyncHandler(async (req, res) => {
  try{
    const id = req.query.uid * 1;
    const limit = req.query.limit * 1 || 1000;
    let isSame = false;
    console.log(req.user);
    if(req.user?.user_id === id) 
      isSame = true;

    if(!id) {
      return res.status(400).json({code: 400, message: 'Invalid user id'});
    }
    await postService.getPostsByUser(id, limit, isSame, (err, data) => {
      if(err) {
        return res.status(err.code).json(err);
      }
      return res.status(data.code).json(data);
    });
  }catch(error) {
    console.error(error)
    return res.status(error.code).json(error);
  }
});

exports.deletePost          = asyncHandler(async (req, res) => {
  try{
    const id = req.params.id;
    await postService.deletePost(id, (err, data) => {
      if(err) {
        return res.status(err.code).json(err);
      }
      return res.status(data.code).json(data);
    });
  }catch(error) {
    console.error(error)
    return res.status(error.code).json(error);
  }
});

exports.publishPost         = asyncHandler(async (req, res) => {
  try{
    const id = req.params.id;
    //check if admin to either publish or wait for approval
    
    const isAdmin = false;
    await postService.publishPost(id, isAdmin, (err, data) => {
      if(err) {
        return res.status(err.code).json(err);
      }
      return res.status(data.code).json(data);
    });
  }catch(error) {
    console.error(error)
    return res.status(error.code).json(error);
  }
});