const connection = require('../configs/sqlize.config')
const {Sequelize, DataTypes} = require('sequelize')

const UserType = connection.define(
  "user_types",
  {
    type_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title : {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },{
    createdAt: false,
    updatedAt: false
  } 
);

module.exports = UserType;