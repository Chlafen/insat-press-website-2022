const env = process.env;
const db = {
  host: "localhost",
  user: "root",
  password: "Nikommha123€",
  database: process.env.DB_NAME || 'insatprecminsatp',
  port: env.DB_PORT || 3306
};

module.exports = db;
