const { tipoIngresos } = require("../configDB/configDB");
const db = require("../configDB/configDB");
const TipoIngresos = db.tipoIngresos;
const Op = db.Sequelize.Op;

exports.getTipoIngresos = async (req, res) => {
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
  TipoIngresos.findAndCountAll({
    where: {
      email: { [Op.like]: `%${req.query.email}%` },
      descripcion: { [Op.like]: `%${req.query.sch}%` },
    },
    limit,
    offset,
  })
    .then((data) => {
      const response = getPagingData(data, page, limit);
     // console.log(response);
      res.json({
        status: "200",
        msg: "Tipo de Ingresos Registrados..",
        data: response,
      });
    })
    .catch((err) => {
    //  console.log(err);
      res.status(500).send({
        message: err.message || "Error al leer Tipo de Ingresos..",
      });
    });
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: tipoIngresos } = data;
  const currentPage = page > 0 ? page + 1 : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { tipoIngresos, totalItems, totalPages, currentPage };
};

exports.createTipoIngreso = async (req, res) => {
  let existeTipoIngreso = "";
  try {
    existeTipoIngreso = await TipoIngresos.findOne({
      where: {
        email: req.body.data.email,
        descripcion: req.body.data.descripcion,
      },
    });
  } catch (error) {
    res.json({ status: "409", msg: error.message });
  }
  if (existeTipoIngreso != null) {
    if (existeTipoIngreso) {
      return res.json({
        status: "400",
        msg: "El Tipo de Ingreso, ya está registrado",
      });
    }
  }

  const newIngresos = {
    email: req.body.data.email,
    descripcion: req.body.data.descripcion,
  };
  try {
    await TipoIngresos.create(newIngresos);
    res.json({
      status: "201",
      msg: "El registro fue Creado",
      data: newIngresos,
    });
  } catch (error) {
    res.json({ status: "409", msg: error.message });
  }
};

exports.getTipoIngreso = async (req, res) => {
  let { id } = req.params;
  const existeTipoIngreso = await TipoIngresos.findOne({
    where: { id: req.params.id },
  });
  if (!existeTipoIngreso) {
    return res.json({
      status: "404",
      msg: "El Tipo de Ingreso, no está registrado",
    });
  }
  res.json({ status: "200", data: existeTipoIngreso });
};

exports.getTipoIngresoDescrip = async (id) => {
  const existeTipoIngreso = await TipoIngresos.findOne({
    where: { id: id },
  });
  return existeTipoIngreso;
};

exports.updateTipoIngreso = async (req, res, next) => {
  TipoIngresos.update(
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

exports.deleteTipoIngreso = async (req, res, next) => {
  const existeusuario = await TipoIngresos.findOne({
    where: { id: req.params.id },
  });
  if (!existeusuario) {
    return res.json({
      status: "404",
      msg: "El Tipo de Ingreso, no está registrado",
    });
  }
  try {
    await TipoIngresos.destroy({ where: { id: req.params.id } });
    return res.json({ status: "200", msg: "Registro Eliminado." });
  } catch (error) {
    res.json({ status: "400", msg: error });
  }
};
