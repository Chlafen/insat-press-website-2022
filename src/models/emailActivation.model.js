const connection = require('../configs/sqlize.config')
const {Sequelize, DataTypes} = require('sequelize')


const EmailActivation = connection.define(
  "email_activations",
  {
    email_activation_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    email_activation_token: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    expiration_date: {
      type: DataTypes.TIME,
      allowNull: false,
    }
  },{
    createdAt: false,
    updatedAt: false
  }
);

module.exports = EmailActivation;