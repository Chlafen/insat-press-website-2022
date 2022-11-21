const {UserModel} = require('../models');
const {responseHandler} = require('../helpers/handlers');
const {Sequelize} = require('sequelize');

const checkExistence = async (req, res, next) => {
  const { username, email} = req.body;
  const user = await UserModel.findOne({
    where: {
      [Sequelize.Op.or]: [
        {username: username},
        {email: email},
      ],
    },
  })
    .catch((err) => {
      console.log(__errlogclr, err);
      return res
        .status(err.statusCode)
        .json(responseHandler(false, err.statusCode, 'Server Error', null));
    });
  if(user !== null) { 
    return res
      .status(400)
      .json(responseHandler(false, 400, 'User already exists', null));
  }
  
  next();
};

module.exports = checkExistence;