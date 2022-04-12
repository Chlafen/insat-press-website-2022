const {DataTypes} = require('sequelize');
const db = require('../configs/db.config');


const PostCategory = function(postCategory) {
  this.type = postCategory.type;
}

const PostCategoryModel = db.define(
  "post_categories",
  {
    type : {
      type: DataTypes.ENUM('primary', 'secondary'),
      allowNull: false,
    }
  },{
    createdAt: false,
    updatedAt: false
  }
);

module.exports = {PostCategory, PostCategoryModel};