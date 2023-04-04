const dbConfig = require("./database.js");
const { Sequelize, DataTypes } = require("sequelize");
/*
DB_HOST: us-cdbr-east-06.cleardb.net
DB_DATABASE: heroku_3a90d0af39b56c6
DB_USER: b66ab2862cf7c6
DB_PASSWORD: 684ccc08
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
*/
const sequelize = new Sequelize(
  "heroku_b72450ee00ac91b",
  "b954e91af793b9",
  "b0b4f80e",
  {
    host: "us-cdbr-east-06.cleardb.net",
    dialect: dbConfig.dialect,
    port: "3306",
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
    socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado a la Base de Datos MqSql.");
  })
  .catch((err) => {
    console.log(
      "Datos de Conexión a la bd..",
      dbConfig.HOST,
      dbConfig.DB,
      dbConfig.USER,
      dbConfig.PASSWORD
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
