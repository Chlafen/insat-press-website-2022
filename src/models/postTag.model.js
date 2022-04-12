const {DataTypes} = require('sequelize');
const db = require('../configs/db.config');


const PostTag = function(postTag) {
  this.tag_id = postTag.tag_id;
  this.tag_name = postTag.tag_name;
}

const PostTagModel = db.define(
  'post_tags',
  {
    tag_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tag_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    createdAt: false,
    updatedAt: false
  }
);

module.exports = {PostTag, PostTagModel};