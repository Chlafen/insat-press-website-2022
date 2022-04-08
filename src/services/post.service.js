const db = require('./db.service');
const Post = require('../models/post.model');
const User = require('../models/user.model');


async function getPost(pid) {
  const rows = await Post.findAll({
    attributes: [ 'post_date', 'post_content', 'post_title', 'post_type', 'post_mime_type', 'comment_count'],
    where: {
      post_id: pid,
      post_type: 'post'
    },
    include: [{
      model: User,
      attributes: [ 'post_author'],
      as: 'author',
    }]
  });
  const data = rows ? rows[0] : {};
  return data;
}

async function createPost(data){
  console.log(data)
  const post_id = await Post.create({
    post_author: 4,
    post_date: data.timeOfPost.slice(0, 19).replace('T', ' '),
    post_content: data.content,
    post_title: data.title,
    post_modified: data.timeOfPost.slice(0, 19).replace('T', ' '),
    guid: "data.guid",
    post_type: "data.post_type",
    post_mime_type: "data.post_mime_type",
    comment_count: 0
  });
  return post_id;
}

module.exports = {
  getPost,
  createPost
}