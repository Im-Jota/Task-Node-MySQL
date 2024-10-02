const mysql2 = require('mysql2');
const { db_host, db_user, db_password, db_name } = require('./config.js');

const connection = mysql2.createConnection({
  host: db_host,
  user: db_user,
  password: db_password,
  database: db_name
})

connection.connect((error) => {
  if (error) console.log(error);
  console.log('conected')
})

module.exports = connection
