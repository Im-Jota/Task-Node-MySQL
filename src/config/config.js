require('dotenv').config();

const db_host = process.env.DB_HOST;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_name = process.env.DB_NAME;

const host = process.env.HOST;
const port = process.env.PORT;

module.exports = {
  db_host,
  db_user,
  db_password,
  db_name,
  host,
  port
}
