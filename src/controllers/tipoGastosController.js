//const { and } = require("sequelize");
const { tipoGastos } = require("../configDB/configDB");
const db = require("../configDB/configDB");
const TipoGastos = db.tipoGastos;
const Op = db.Sequelize.Op;

exports.getTipoGastos = async (req, res) => {
 /* console.log("==========================================");
  console.log("req.body...", req.body);
  console.log("req.query...", req.query);
  console.log("=========================================="); */
  let page = req.query.page ? req.query.page - 1 : 0;
  page = page < 0 ? 0 : page;
  let limit = parseInt(req.query.limit || 10);
  limit = limit < 0 ? 10 : limit;
  const offset = page * limit;
  const search = req.query.sch;
  const email = req.query.email;
 /* console.log(
    "Condicion..:",
    "offset..",
    offset,
    "limit ..",
    limit,
    "page...",
    page,
    "search..",
    search,
    "wemail..",
    email
  );
*/
  TipoGastos.findAndCountAll({
    where: {
      email: { [Op.like]: `%${email}%` },
       descripcion: { [Op.like]: `%${search}%` },
    },
    limit,
    offset,
  })
    .then((data) => {
      const response = getPagingData(data, page, limit);
    //  console.log(response);
      res.json({
        status: "200",
        msg: "Tipo de Gastos Registrados..",
        data: response,
      });
    })
    .catch((err) => {
    //  console.log(err);
      res.status(500).send({
        message: err.message || "Error al leer Tipo de Gastos..",
      });
    });
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: tipoGastos } = data;
  const currentPage = page > 0 ? page + 1 : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { tipoGastos, totalItems, totalPages, currentPage };
};

exports.createTipoGasto = async (req, res) => {
  let existeTipoGasto = "";
  try {
    existeTipoGasto = await TipoGastos.findOne({
      where: {
        email: req.body.data.email,
        descripcion: req.body.data.descripcion,
      },
    });
  } catch (error) {
    res.json({ status: "409", msg: error.message });
  }
 // console.log("......salida...", existeTipoGasto);
  if (existeTipoGasto != null) {
    if (existeTipoGasto) {
      return res.json({
        status: "400",
        msg: "El TipoGasto, ya está registrado",
      });
    }
  }

  const newGastos = {
    email: req.body.data.email,
    descripcion: req.body.data.descripcion,
  };
  try {
    await TipoGastos.create(newGastos);
    res.json({ status: "201", msg: "El registro fue Creado", data: newGastos });
  } catch (error) {
    res.json({ status: "409", msg: error.message });
  }
};

exports.getTipoGasto = async (req, res) => {
  let { id } = req.params;
  const existeTipoGasto = await TipoGastos.findOne({
    where: { id: req.params.id },
  });
  if (!existeTipoGasto) {
    return res.json({ status: "404", msg: "El TipoGasto, no está registrado" });
  }
  res.json({ status: "200", data: existeTipoGasto });
};

exports.getTipoGastoDescrip = async (id) => {
  const existeTipoGasto = await TipoGastos.findOne({
    where: { id: id },
  });
  return existeTipoGasto;
};

exports.updateTipoGasto = async (req, res, next) => {
  TipoGastos.update(
    {
      email: req.body.data.email,
      descripcion: req.body.data.descripcion,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then(function () {
      res.json({ status: "200", msg: "Actualización realizada exitosamente" });
    })
    .catch((err) => {
      res.json({ status: "409", msg: err.message });
    });
};

exports.deleteTipoGasto = async (req, res, next) => {
  const existeusuario = await TipoGastos.findOne({
    where: { id: req.params.id },
  });
  if (!existeusuario) {
    return res.json({
      status: "404",
      msg: "El Tipo de Gasto, no está registrado",
    });
  }
  try {
    await TipoGastos.destroy({ where: { id: req.params.id } });
    return res.json({ status: "200", msg: "Registro Eliminado." });
  } catch (error) {
    res.json({ status: "400", msg: error });
  }
};
