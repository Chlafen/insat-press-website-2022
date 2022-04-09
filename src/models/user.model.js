const connection = require('../configs/sqlize.config')
const {Sequelize, DataTypes} = require('sequelize')

const User = connection.define(
  "users",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    display_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    join_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    profile_pic: {
      type: DataTypes.STRING(255),
      allowNull: true,
    }
  },{
    createdAt: false,
    updatedAt: false
  }
);

module.exports = User;