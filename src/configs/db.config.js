const { Sequelize } = require('sequelize'); 
const dotenv = require('dotenv');

const config = require('./index');

dotenv.config();

if( process.env.RAILWAY === 'true' ) {
  var sequelize = new Sequelize(config.db.url,{
    dialect: 'mysql',
    logging: false,
  });
}else {
  var sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    logging: false,
    dialect: 'mysql',
    host: config.db.host,
    port: config.db.port,
    define: {
      timestamps: false
    },
  });
}




(async () => await sequelize.sync().catch( err => {console.log(__errlogclr, "Sequelize error!");console.log(err);} ))();

module.exports = sequelize;