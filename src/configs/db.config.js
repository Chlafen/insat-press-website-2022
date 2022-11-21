const { Sequelize } = require('sequelize'); 
const dotenv = require('dotenv');

const config = require('./index');

dotenv.config();

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, 
  {
    logging: false,
    dialect: 'mysql',
    host: config.db.host, 
    define: {
      timestamps: false
    }
  } 
);




(async () => await sequelize.sync().catch( err => {console.log(__errlogclr, err);} ))();

module.exports = sequelize;