const {DataTypes} = require('sequelize');
const db = require('../configs/db.config');


const Log = function(log) {
  this.ip = log.ip;
  this.user_agent = log.user_agent;
  this.created_at = log.created_at;
  this.action = log.action;
  this.username = log.username;
}


const LogModel = db.define(
  "logs",
  {
    log_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    ip : {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    user_agent : {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_at : {
      type: DataTypes.DATE,
      allowNull: false,
    },
    action : {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    username : {
      type: DataTypes.STRING(50),
      allowNull: false,
    }
  },{
    createdAt: false,
    updatedAt: false
  }
);

module.exports = {LogModel, Log};