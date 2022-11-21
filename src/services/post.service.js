const { postRepository } = require('../repositories');


exports.retrieveOne = (postId, result) => postRepository.retrieveOne(postId, result);

exports.createPost = (post, result) => postRepository.createPost(post, result);

exports.getPostsByCategory = (slug, limit, offset, result) => postRepository.getPostsByCategory(slug, limit, offset, result);

exports.getVideos = (limit, result) => postRepository.getVideos(limit, result);

exports.getLatest = (start, limit, result) => postRepository.getLatest(start, limit, result);

exports.getPopular = (start, limit, result) => postRepository.getPopular(start, limit, result);

exports.getPostsByUser = (userId, limit, isSame, result) => postRepository.getPostsByUser(userId, limit, isSame, result);

exports.deletePost = (postId, result) => postRepository.deletePost(postId, result);

exports.publishPost = (postId, isAdmin, result) => postRepository.publishPost(postId, isAdmin, result);
