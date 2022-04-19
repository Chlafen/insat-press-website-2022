const {DataTypes} = require('sequelize');
const db = require('../configs/db.config');


const EmailActivation = function(emailActivation) {
    this.email_activation_token = emailActivation.email_activation_token;
    this.expiration_date = emailActivation.email_activation_expiration;
}

const EmailActivationModel = db.define(
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
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    }
  },{
    createdAt: false,
    updatedAt: false
  }
);

module.exports = { EmailActivation, EmailActivationModel };
