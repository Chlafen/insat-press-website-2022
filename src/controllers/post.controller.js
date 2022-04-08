const post = require('../services/post.service'); 


async function get(req, res, next) {
  try {
    if(req.query.pid)
      res.json(await post.getPost(req.query.pid));
    else
      res.sendStatus(404)
  } catch (err) {
    console.error(`Error while getting post pid=${req.query.pid || "unspecified"}.\n`, err.message);
  }
}

async function update(req, res, next) {
  try {
    res.json(await post.updatePost(req.body));
  } catch (err) {
    console.error(`Error while updating post pid=${req.query.pid || "unspecified"}.\n`, err.message);
  }
}

async function create(req, res, next) {
  try {
    res.json(await post.createPost(req.body));
  } catch (err) {
    console.error(`Error while creating post.\n`, err.message);
  }
}

async function deletePost(req, res, next) {
  try {
    if(req.query.pid)
      res.json(await post.getPost(req.query.pid));
    else
      res.sendStatus(404)
  } catch (err) {
    console.error(`Error while deleting post pid=${req.query.pid || "unspecified"}.\n`, err.message);
  }
}

module.exports = {
  get,
  update,
  create,
  deletePost
};
