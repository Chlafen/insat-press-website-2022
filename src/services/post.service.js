const { postRepository } = require('../repositories');


exports.retrieveOne = (postId, result) => postRepository.retrieveOne(postId, result);

exports.createPost = (post, result) => postRepository.createPost(post, result);

exports.getPostsByCategory = (slug, limit, offset, result) => postRepository.getPostsByCategory(slug, limit, offset, result);

exports.getVideos = (limit, result) => postRepository.getVideos(limit, result);

exports.getLatest = (limit, result) => postRepository.getLatest(limit, result);