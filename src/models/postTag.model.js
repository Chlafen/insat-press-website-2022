const connection = require('../configs/sqlize.config')
const {Sequelize, DataTypes} = require('sequelize')

const PostTag = connection.define('post_tags', {
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
})


module.exports = PostTag