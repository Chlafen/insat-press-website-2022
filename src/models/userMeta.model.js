const {DataTypes} = require('sequelize');
const db = require('../configs/db.config');


const UserMeta = function(userMeta) {
  this.meta_key = userMeta.meta_key;
  this.meta_value = userMeta.meta_value;
}

const UserMetaModel = db.define(
  "users_meta",
  {
    meta_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    meta_key: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    meta_value: {
      type: DataTypes.STRING(255),
      allowNull: true,
    }
  },{
    createdAt: false,
    updatedAt: false
  }
);

module.exports = {UserMeta, UserMetaModel};