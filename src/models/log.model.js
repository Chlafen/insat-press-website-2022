const connection = require('../configs/sqlize.config')
const {Sequelize, DataTypes} = require('sequelize')

const Logs = connection.define(
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
    time : {
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

module.exports = Logs;