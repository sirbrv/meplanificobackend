const { planes } = require("../configDB/configDB");
const db = require("../configDB/configDB");
const Planes = db.planes;
const Op = db.Sequelize.Op;

exports.getPlanes = async (req, res) => {
 /* console.log("================enttre========================");
  console.log("req.body...", req.body);
  console.log("req.query...", req.query);
  console.log("=========================================="); */
  let page = req.query.page ? req.query.page - 1 : 0;
  page = page < 0 ? 0 : page;
  let limit = parseInt(req.query.limit || 10);
  limit = limit < 0 ? 10 : limit;
  const offset = page * limit;
      // console.log("Listado de DATA....:");

  await Planes.findAndCountAll({
    where: {
      email: { [Op.like]: `%${req.query.email}%` },
      year: { [Op.like]: `%${req.query.shYear}%` },
      mes: { [Op.like]: `%${req.query.shMes}%` },
      tipoGasto: { [Op.like]: `%${req.query.shTipo}%` },
      tipoGastoDescripcion: { [Op.like]: `%${req.query.sch}%` },
    },
    limit,
    offset,
  })
    .then((data) => {
    //   console.log("Listado de DATA....:", data);
     const response = getPagingData(data, page, limit);
    //  console.log("Listado de Planes....:", response);
      res.json({
        status: "200",
        msg: "Planes Registrados..",
        data: response,
      });
    })
    .catch((err) => {
    //  console.log("Error....;0", err)
      res.status(500).send({
        message: err.message || "Error al leer Planes..",
      });
    });
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: planes } = data;
  const currentPage = page > 0 ? page + 1 : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { planes, totalItems, totalPages, currentPage };
};

exports.createPlan = async (req, res) => {
 /* console.log("==========================================");
  console.log("req.body...", req.body);
  console.log("req.query...", req.query);
  console.log("==========================================");*/

  let existePlan = "";

  /*  try {
    existePlan = await Planes.findOne({
      where: {
        email: req.body.data.email,
        descripcion: req.body.data.descripcion,
      },
    });
  } catch (error) {
    res.json({ status: "409", msg: error.message });
  }
  // console.log("......salida...", existePlanes);
  if (existePlan != null) {
    if (existePlanes) {
      return res.json({
        status: "400",
        msg: "El Plan, ya está registrado",
      });
    }
  } */

  const newPlanes = {
    fecha: req.body.data.fechaPlanes,
    email: req.body.data.email,
    year: req.body.data.year,
    mes: req.body.data.mes,
    tipoGasto: req.body.data.tipoGasto,
    tipoGastoDescripcion: req.body.data.tipoGastoDescrip,
    monto: req.body.data.monto,
  };
 // console.log("newPlanes....:", newPlanes);
  try {
    await Planes.create(newPlanes);
    res.json({
      status: "201",
      msg: "El registro fue Creado",
      data: newPlanes,
    });
  } catch (error) {
   // console.log(error);
    res.json({ status: "409", msg: error.message });
  }
};

exports.getPlan = async (req, res) => {
  let { id } = req.params;
  try {
    const existePlan = await Planes.findOne({
      where: { id: req.params.id },
    });
    if (!existePlan) {
      return res.json({ status: "404", msg: "El Plan, no está registrado" });
    }
    res.json({ status: "200", data: existePlan });
  } catch (error) {
    res.json({ status: "409", msg: error.message });
  }
};

exports.updatePlan = async (req, res, next) => {
 /* console.log("==========================================");
  console.log("req.body...", req.body);
  console.log("req.query...", req.query);
  console.log("=========================================="); */
  Planes.update(
    {
      email: req.body.data.email,
      year: req.body.data.year,
      mes: req.body.data.mes,
      tipoGasto: req.body.data.tipoGasto,
      tipoGastoDescripcion: req.body.data.tipoGastoDescrip,
      fecha: req.body.data.fechaPlanes,
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

exports.deletePlan = async (req, res, next) => {
  const existeusuario = await Planes.findOne({
    where: { id: req.params.id },
  });
  if (!existeusuario) {
    return res.json({
      status: "404",
      msg: "El Plan, no está registrado",
    });
  }
  try {
    await Planes.destroy({ where: { id: req.params.id } });
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
