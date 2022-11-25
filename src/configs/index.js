if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
// console.log(`ENVIRONMENT VARIABLE '${"pwd"}' = '${process.env.DB_PASS}'`);

const getEnvVariable = (key) => {
  const value = process.env[key];
  if (!value && process.env.NODE_ENV === 'production') {
    throw new Error(`ENVIRONMENT VARIABLE '${key}' NOT SPECIFIED.`);
  }
  // console.log(`ENVIRONMENT VARIABLE '${key}' = '${value}'`);
  return value;
};

let config;

if(getEnvVariable('RAILWAY') === 'true') {
  console.log('RAILWAY ENVIRONMENT DETECTED');
  config = {
    db: {
      url: getEnvVariable('MYSQL_URL'),
    }
  };
}else {
  config = {
    db: {
      host:     getEnvVariable("DB_HOST"),
      user:     getEnvVariable("DB_USER"),
      password: getEnvVariable("DB_PASS"),
      database: getEnvVariable("DB_NAME"),
      port:     getEnvVariable("DB_PORT"),
    }
  };
}


module.exports = config;
