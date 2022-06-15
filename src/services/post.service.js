const { postRepository } = require('../repositories');


exports.retrieveOne = (postId, result) => postRepository.retrieveOne(postId, result);

exports.createPost = (post, result) => postRepository.createPost(post, result);

exports.getPostsByCategory = (slug, limit, offset, result) => postRepository.getPostsByCategory(slug, limit, offset, result);