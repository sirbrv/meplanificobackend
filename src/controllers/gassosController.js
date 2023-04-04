const { gastos } = require("../configDB/configDB");
const db = require("../configDB/configDB");
const Gastos = db.gastos;
const Op = db.Sequelize.Op;

exports.getGastos = async (req, res) => {
/*  console.log("==========================================");
  console.log("req.body...", req.body);
  console.log("req.query...", req.query);
  console.log("=========================================="); */
  let page = req.query.page ? req.query.page - 1 : 0;
  page = page < 0 ? 0 : page;
  let limit = parseInt(req.query.limit || 10);
  limit = limit < 0 ? 10 : limit;
  const offset = page * limit;

  let startFecha = fnStartFecha(req.query.shMes, req.query.shYear);
  let endFecha = fnEndFecha(req.query.shMes, req.query.shYear);
  await Gastos.findAndCountAll({
    where: {
      fecha: {
        [Op.between]: [startFecha, endFecha],
      },
      email: { [Op.like]: `%${req.query.email}%` },
      descripcion: { [Op.like]: `%${req.query.sch}%` },
      tipoGasto: { [Op.like]: `%${req.query.shTipo}%` },
      condicion: { [Op.like]: `%${req.query.shCondicion}%` },
    },
    limit,
    offset,
  })
    .then((data) => {
      const response = getPagingData(data, page, limit);
     // console.log(response);
      res.json({
        status: "200",
        msg: "Gastos Registrados..",
        data: response,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error al leer Gastos..",
      });
    });
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: gastos } = data;
  const currentPage = page > 0 ? page + 1 : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { gastos, totalItems, totalPages, currentPage };
};

exports.createGasto = async (req, res) => {
/*  console.log("==========================================");
  console.log("req.body...", req.body);
  console.log("req.query...", req.query);
  console.log("=========================================="); */
  let existeGasto = "";

  /*  try {
    existeGasto = await Gastos.findOne({
      where: {
        email: req.body.data.email,
        descripcion: req.body.data.descripcion,
      },
    });
  } catch (error) {
    res.json({ status: "409", msg: error.message });
  }
  // console.log("......salida...", existeGastos);
  if (existeGasto != null) {
    if (existeGastos) {
      return res.json({
        status: "400",
        msg: "El Gasto, ya está registrado",
      });
    }
  } */

  const newGastos = {
    email: req.body.data.email,
    fecha: converFecha(req.body.data.fechaGasto),
    tipoGasto: req.body.data.tipoGasto,
    tipoGastoDescripcion: req.body.data.tipoGastoDescrip,
    descripcion: req.body.data.descripcion,
    condicion: req.body.data.condicion,
    condicionDescripcion: req.body.data.condicionDescrip,
    monto: req.body.data.monto,
  };
  try {
    await Gastos.create(newGastos);
    res.json({
      status: "201",
      msg: "El registro fue Creado",
      data: newGastos,
    });
  } catch (error) {
    res.json({ status: "409", msg: error.message });
  }
};

exports.getGasto = async (req, res) => {
  let { id } = req.params;
  try {
    const existeGasto = await Gastos.findOne({
      where: { id: req.params.id },
    });
    if (!existeGasto) {
      return res.json({ status: "404", msg: "El Gasto, no está registrado" });
    }
    res.json({ status: "200", data: existeGasto });
  } catch (error) {
    res.json({ status: "409", msg: error.message });
  }
};

exports.updateGasto = async (req, res, next) => {
 /* console.log("==========================================");
  console.log("req.body...", req.body);
  console.log("req.query...", req.query);
  console.log("=========================================="); */
  Gastos.update(
    {
      email: req.body.data.email,
      fecha: converFecha(req.body.data.fechaGasto),
      descripcion: req.body.data.descripcion,
      tipoGasto: req.body.data.tipoGasto,
      tipoGastoDescripcion: req.body.data.tipoGastoDescrip,
      condicion: req.body.data.condicion,
      condicionDescripcion: req.body.data.condicionDescrip,
      monto: req.body.data.monto,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then(function () {
      res.json({
        status: "200",
        msg: "Actualización realizada exitosamente",
      });
    })
    .catch((err) => {
      res.json({ status: "409", msg: err.message });
    });
};

exports.deleteGasto = async (req, res, next) => {
  const existeusuario = await Gastos.findOne({
    where: { id: req.params.id },
  });
  if (!existeusuario) {
    return res.json({
      status: "404",
      msg: "El Gasto, no está registrado",
    });
  }
  try {
    await Gastos.destroy({ where: { id: req.params.id } });
    return res.json({ status: "200", msg: "Registro Eliminado." });
  } catch (error) {
    res.json({ status: "400", msg: error });
  }
};

const converFecha = (fecha) => {
  const [day, month, year] = fecha.split("/");
  const date = new Date(+year, +month - 1, +day);
  return date;
};

const fnStartFecha = (month, year) => {
  month < 10 ? (month = "0" + month) : month;
  const date = year + "-" + month + "-01";
//  console.log(date);
  return date;
};

const fnEndFecha = (month, year) => {
  month < 10 ? (month = "0" + month) : month;
  let date = year + "-" + month + "-31";
  if (month == 2) {
    date = year + "-" + month + "-29";
  }
//  console.log(date);
  return date;
};
