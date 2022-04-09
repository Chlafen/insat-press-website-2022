const connection = require('../configs/sqlize.config')
const {Sequelize, DataTypes} = require('sequelize')

const PostCategory = connection.define(
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

module.exports = PostCategory;