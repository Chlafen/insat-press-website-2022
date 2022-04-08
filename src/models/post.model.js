const connection = require('../configs/sqlize.config')
const {Sequelize, DataTypes} = require('sequelize')
const User = require('./user.model')

const Post = connection.define(
  "posts", 
  {
    post_id : {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    author_id: {
      references: {
        model: User,
        key: 'user_id',
      },
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    post_content : {
      type: DataTypes.TEXT('long'),
      allowNull: false
    } ,
    post_title : {
      type: DataTypes.TEXT,
      allowNull: false
    } ,
    post_edit : {
      type: DataTypes.DATE,
      allowNull: false,
    },
    post_date : {
      type: DataTypes.DATE,
      allowNull: false,
    }, 
    view_count : {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    image_path : {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    type : {
      type: DataTypes.STRING(50),
      allowNull: false
    } 
  },{
    createdAt: false,
    updatedAt: false
  }
);


Post.sync();

module.exports = Post