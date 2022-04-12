const {DataTypes} = require('sequelize');
const db = require('../configs/db.config');


const Category = function(category) {
  this.category_name = category.category_name;
  this.category_slug = category.category_slug;
}

const CategoryModel = db.define(
  "categories",
  {
    category_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    category_slug: {
      type: DataTypes.STRING(50),
      allowNull: false,
    }
  },{
    createdAt: false,
    updatedAt: false
  }
);

module.exports = {CategoryModel, Category};