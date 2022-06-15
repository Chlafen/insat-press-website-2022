const { categoryRepository } = require('../repositories');

exports.getAll = (limit, result) => categoryRepository.getAll(limit, result);