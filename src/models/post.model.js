const {DataTypes} = require('sequelize');
const db = require('../configs/db.config');


const Post = function (post) {
  this.post_content = post.post_content;
  this.post_title = post.post_title;
  this.post_edit = post.post_edit;
  this.post_date = post.post_date;
  this.view_count = post.view_count;
  this.image_path = post.image_path;
  this.type = post.type;
  this.author_id = post.author_id;
  this.tags = post.tags;
  this.categories = post.categories;
  this.attachments = post.attachments;
}

const PostModel = db.define(
  "posts", 
  {
    post_id : {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
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
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: 'uploads/default_post_bgr.jpg',
    },
    type : {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  },{
    db,
    timestamps: false,
    createdAt: false,
    updatedAt: false
  }
);

module.exports = {Post, PostModel};