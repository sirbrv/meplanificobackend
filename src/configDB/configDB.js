const dbConfig = require("./database.js");
const { Sequelize, DataTypes } = require("sequelize");
const port = process.env.PORT || "4000";
const DB_HOST = process.env.HOST;
const DB_USER = process.env.USER;
const DB_PASSWORD = process.env.PASSWORD;
const DB_DATABASE = process.env.DATA_BASE;

// Parametros de conexion de db

/* if (port != 4000) { */
DB_HOST = process.env.DB_HOST; //"us-cdbr-east-06.cleardb.net";
DB_DATABASE = process.env.DB_DATABASE; //"heroku_3a90d0af39b56c6";
DB_USER = process.env.DB_USER; //"b66ab2862cf7c6";
DB_PASSWORD = process.env.DB_PASSWORD; //"684ccc08";
/*}
/*
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    */
const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: dbConfig.dialect,
  port: "3306",
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado a la Base de Datos MqSql.");
  })
  .catch((err) => {
    console.log(
      "Datos de Conexión a la bd..",
      dbConfig.host,
      dbConfig.database,
      dbConfig.user,
      dbConfig.password
    );
    console.log("Error de Conexión a la BD.." + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("../models/mysql/usersModel.js")(sequelize, DataTypes);
db.tipoGastos = require("../models/mysql/tipoGastosModel.js")(
  sequelize,
  DataTypes
);
db.tipoIngresos = require("../models/mysql/tipoIngresosModel.js")(
  sequelize,
  DataTypes
);
db.planes = require("../models/mysql/planesModel.js")(sequelize, DataTypes);
db.gastos = require("../models/mysql/gastosModel.js")(sequelize, DataTypes);
db.ingresos = require("../models/mysql/ingresosModel.js")(sequelize, DataTypes);
db.condiciones = require("../models/mysql/condicionesModel.js")(
  sequelize,
  DataTypes
);
db.sequelize.sync({ force: false }).then(() => {
  console.log("re-sync terminado!");
});

module.exports = db;
