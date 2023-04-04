require("dotenv").config();
const PORT = process.env.PORT || "4000";
const HOST = process.env.HOST;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const DB = process.env.DATA_BASE;
/*
// Parametros de conexion de db
*/
if (PORT == 4000) {
  HOST: process.env.HOST;
  USER: process.env.USER;
  PASSWORD: process.env.PASSWORD;
  DB: process.env.DATA_BASE;
} else {
  HOST: process.env.DB_HOST;
  USER: process.env.DB_USER;
  DB: process.env.DB_DATABASE;
  PASSWORD: process.env.DB_PASSWORD;
}

const dialect = "mysql";
const pool = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000,
};

console.log(HOST, USER, PASSWORD, DB, dialect, pool);

module.exports = { HOST, USER, PASSWORD, DB, dialect, pool };
