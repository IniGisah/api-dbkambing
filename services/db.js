const Pool = require('pg').Pool
const config = require('./config');

async function query(sql, params) {
  const connection = await new Pool(config.db);
  const results = await connection.query(sql);

  return results;
}

module.exports = {
  query
}