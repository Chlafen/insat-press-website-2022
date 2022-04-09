const connection = require('../configs/sqlize.config')
const {Sequelize, DataTypes} = require('sequelize');
const User = require('./user.model');

const UserMeta = connection.define(
  "users_meta",
  {
    meta_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    meta_key: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    meta_value: {
      type: DataTypes.STRING(255),
      allowNull: false,
    }
  },{
    createdAt: false,
    updatedAt: false
  }
);

module.exports = UserMeta;