const { clientes } = require("../configDB/configDB");
const db = require("../configDB/configDB");
const Clientes = db.clientes;
const Op = db.Sequelize.Op;

app.get("/:img", function (req, res) {
  res.sendFile(__dirname + `/imagenes/${img}`);
});