const { ingresos } = require("../configDB/configDB");
const db = require("../configDB/configDB");
const Ingresos = db.ingresos;
const Op = db.Sequelize.Op;

exports.getIngresos = async (req, res) => {
/*  console.log("==========================================");
  console.log("req.query...", req.query);
  console.log("=========================================="); */
  let page = req.query.page ? req.query.page - 1 : 0;
  page = page < 0 ? 0 : page;
  let limit = parseInt(req.query.limit || 10);
  limit = limit < 0 ? 10 : limit;
  const offset = page * limit;

  let startFecha = fnStartFecha(req.query.shMes, req.query.shYear);
  let endFecha = fnEndFecha(req.query.shMes, req.query.shYear);
  await Ingresos.findAndCountAll({
    where: {
      fecha: {
        [Op.between]: [startFecha, endFecha],
      },
      email: { [Op.like]: `%${req.query.email}%` },
      descripcion: { [Op.like]: `%${req.query.sch}%` },
      tipoIngreso: { [Op.like]: `%${req.query.shTipo}%` },
      condicion: { [Op.like]: `%${req.query.shCondicion}%` },
    },
    limit,
    offset,
  })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.json({
        status: "200",
        msg: "Ingresos Registrados..",
        data: response,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error al leer Ingresos..",
      });
    });
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: ingresos } = data;
  const currentPage = page > 0 ? page + 1 : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { ingresos, totalItems, totalPages, currentPage };
};

exports.createIngreso = async (req, res) => {
 /* console.log("==========================================");
  console.log("req.body...", req.body);
  console.log("req.query...", req.query);
  console.log("=========================================="); */
  let existeIngreso = "";
  /*  try {
    existeIngreso = await Ingresos.findOne({
      where: {
        email: req.body.data.email,
        descripcion: req.body.data.descripcion,
      },
    });
  } catch (error) {
    res.json({ status: "409", msg: error.message });
  }
  // console.log("......salida...", existeIngresos);
  if (existeIngreso != null) {
    if (existeIngresos) {
      return res.json({
        status: "400",
        msg: "El Ingreso, ya está registrado",
      });
    }
  } */

  const newIngresos = {
    email: req.body.data.email,
    fecha: converFecha(req.body.data.fechaIngreso),
    tipoIngreso: req.body.data.tipoIngreso,
    tipoIngresoDescripcion: req.body.data.tipoIngresoDescrip,
    descripcion: req.body.data.descripcion,
    condicion: req.body.data.condicion,
    condicionDescripcion: req.body.data.condicionDescrip,
    monto: req.body.data.monto,
  };
  try {
    await Ingresos.create(newIngresos);
    res.json({
      status: "201",
      msg: "El registro fue Creado",
      data: newIngresos,
    });
  } catch (error) {
    res.json({ status: "409", msg: error.message });
  }
};

exports.getIngreso = async (req, res) => {
  let { id } = req.params;
  try {
    const existeIngreso = await Ingresos.findOne({
      where: { id: req.params.id },
    });
    if (!existeIngreso) {
      return res.json({ status: "404", msg: "El Ingreso, no está registrado" });
    }
    res.json({ status: "200", data: existeIngreso });
  } catch (error) {
    res.json({ status: "409", msg: error.message });
  }
};

exports.updateIngreso = async (req, res, next) => {
 /* console.log("==========================================");
  console.log("req.body...", req.body);
  console.log("req.query...", req.query);
  console.log("=========================================="); */
  Ingresos.update(
    {
      email: req.body.data.email,
      fecha: converFecha(req.body.data.fechaIngreso),
      descripcion: req.body.data.descripcion,
      tipoIngreso: req.body.data.tipoIngreso,
      tipoIngresoDescripcion: req.body.data.tipoIngresoDescrip,
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

exports.deleteIngreso = async (req, res, next) => {
  const existeusuario = await Ingresos.findOne({
    where: { id: req.params.id },
  });
  if (!existeusuario) {
    return res.json({
      status: "404",
      msg: "El Ingreso, no está registrado",
    });
  }
  try {
    await Ingresos.destroy({ where: { id: req.params.id } });
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
  const date = year + "/" + month + "/01";
  return date;
};

const fnEndFecha = (month, year) => {
  let date = year + "/" + month + "/31";
  if (month == 2) {
    date = year + "/" + month + "/29";
  }
  return date;
};
