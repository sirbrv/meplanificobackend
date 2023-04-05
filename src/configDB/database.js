require("dotenv").config();
const port = process.env.PORT || "4000";
const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATA_BASE;

// Parametros de conexion de db

if (port != 4000) {
  host: process.env.DB_HOST; //
  user: process.env.DB_USER;
  database: process.env.DB_DATABASE;
  password: process.env.DB_PASSWORD;
}

const dialect = "mysql";
const pool = {
  max: 10,
  min: 0,
  acquire: 30000,
  idle: 10000,
};

console.log(host, user, password, database, dialect, pool);

module.exports = { host, user, password, database, dialect, pool };
