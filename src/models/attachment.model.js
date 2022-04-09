const connection = require('../configs/sqlize.config')
const {Sequelize, DataTypes} = require('sequelize')

const Attachment = connection.define(
  "attachments",
  {
    attachment_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    mime_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    attachment_path : {
      type: DataTypes.STRING(255),
      allowNull: false,
    }
  },{
    createdAt: false,
    updatedAt: false
  }
);

module.exports = Attachment;
