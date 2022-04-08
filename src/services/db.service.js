const mysql = require('mysql2/promise');
const dbConfig = require('../configs/db.config');

async function query(sql) {
  const connection = await mysql.createConnection(dbConfig);
  let results;
  await connection.execute(sql).then(res=>{
    [results, ] =  res;
    connection.end();
  });
  return results;
}

module.exports = {
  query
}
