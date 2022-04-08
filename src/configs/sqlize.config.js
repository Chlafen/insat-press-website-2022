const Sequelize = require('sequelize')
const db = require('./db.config')

const sequelize = new Sequelize(
  db.database,
  db.user,
  db.password,
  {
    dialect: 'mysql'
  }
);

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = sequelize