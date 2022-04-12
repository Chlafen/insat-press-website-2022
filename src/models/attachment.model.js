const {DataTypes} = require('sequelize');
const db = require('../configs/db.config');


const Attachment = function(attachment) {
    this.mime_name = attachment.mime_name;
    this.attachment_path = attachment.attachment_path;
}

const AttachmentModel = db.define(
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

module.exports = {Attachment, AttachmentModel};