const {DataTypes} = require('sequelize');
const db = require('../configs/db.config');

// constructor
const User = function(data) { 
  this.username = data.username;
  this.email = data.email;
  this.password = data.password;
  this.first_name = data.first_name;
  this.last_name = data.last_name;
  this.join_date = data.join_date;
  this.profile_pic = data.profile_pic;
}

const UserModel = db.define(
  "users",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
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
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    join_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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

module.exports = {User, UserModel};