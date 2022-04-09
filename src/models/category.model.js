const connection = require('../configs/sqlize.config')
const {Sequelize, DataTypes} = require('sequelize')

const Category = connection.define(
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

module.exports = Category;