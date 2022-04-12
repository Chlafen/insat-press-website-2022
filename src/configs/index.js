const env = process.env;
const dotenv = require('dotenv');

dotenv.config();

const getEnvVariable = (key) => {
  const value = env[key];
  if (!value && env.NODE_ENV === 'production') {
    throw new Error(`ENVIRONMENT VARIABLE '${key}' NOT SPECIFIED.`);
  }
  return value;
};

const config = {
  db: {
    dialect:  'mysql',
    host:     getEnvVariable("DB_HOST"),
    user:     getEnvVariable("DB_USER"),
    password: getEnvVariable("DB_PASSWORD"),
    database: getEnvVariable("DB_NAME"),
    port:     getEnvVariable("DB_PORT"),
  }
};

module.exports = config;
