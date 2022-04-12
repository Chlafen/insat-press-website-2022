const {DataTypes} = require('sequelize');
const db = require('../configs/db.config');


const UserType = function(userType) {
  this.title = userType.title;
}

const UserTypeModel = db.define(
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

module.exports = {UserType, UserTypeModel};