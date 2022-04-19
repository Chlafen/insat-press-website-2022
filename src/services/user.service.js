const {userRepository} = require('../repositories');


exports.retrieveOne = (userId, result) => userRepository.retrieveOne(userId, result);

exports.register = (user, result) => userRepository.register(user, result);

exports.login = (user, result) => userRepository.login(user, result);

exports.loadUser = (userId, result) => userRepository.loadUser(userId, result);

exports.verifyEmail = (token, result) => userRepository.verifyEmail(token, result);