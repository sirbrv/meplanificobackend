const { condiciones } = require("../configDB/configDB");
const db = require("../configDB/configDB");
const Condiciones = db.condiciones;
const Op = db.Sequelize.Op;

exports.getCondiciones = async (req, res) => {
/*  console.log("==========================================");
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
  const tipo = req.query.tipo;
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
  Condiciones.findAndCountAll({
    where: {
      email: { [Op.like]: `%${email}%` },
      tipo: { [Op.like]: `%${tipo}%` },
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
        msg: "Tipo de Condiciones Registradas..",
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
  const { count: totalItems, rows: condiciones } = data;
  const currentPage = page > 0 ? page + 1 : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { condiciones, totalItems, totalPages, currentPage };
};

exports.createCondicion = async (req, res) => {
  let existeCondicion = "";
  try {
    existeCondicion = await Condiciones.findOne({
      where: {
        email: req.body.data.email,
        tipo: req.body.data.tipo,
        descripcion: req.body.data.descripcion,
      },
    });
  } catch (error) {
    res.json({ status: "409", msg: error.message });
  }
  if (existeCondicion != null) {
    if (existeCondicion) {
      return res.json({
        status: "400",
        msg: "La condición, ya está registrada",
      });
    }
  }

  const newIngresos = {
    email: req.body.data.email,
    tipo: req.body.data.tipo,
    descripcion: req.body.data.descripcion,
  };
  try {
    await Condiciones.create(newIngresos);
    res.json({
      status: "201",
      msg: "El registro fue Creado",
      data: newIngresos,
    });
  } catch (error) {
    res.json({ status: "409", msg: error.message });
  }
};

exports.getCondicion = async (req, res) => {
  let { id } = req.params;
  const existeCondicion = await Condiciones.findOne({
    where: { id: req.params.id },
  });
  if (!existeCondicion) {
    return res.json({ status: "404", msg: "La Condición, no está registrada" });
  }
  res.json({ status: "200", data: existeCondicion });
};

exports.getCondicionDescrip = async (id) => {
 // console.log(id)
  const existeCondicion = await Condiciones.findOne({
    where: { id: id },
  });
//  console.log("Salida....:", existeCondicion);
  return existeCondicion;
};

exports.updateCondicion = async (req, res, next) => {
  Condiciones.update(
    {
      email: req.body.data.email,
      tipo: req.body.data.tipo,
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

exports.deleteCondicion = async (req, res, next) => {
  const existeusuario = await Condiciones.findOne({
    where: { id: req.params.id },
  });
  if (!existeusuario) {
    return res.json({
      status: "404",
      msg: "La Condicion, no está registrado",
    });
  }
  try {
    await Condiciones.destroy({ where: { id: req.params.id } });
    return res.json({ status: "200", msg: "Registro Eliminado." });
  } catch (error) {
    res.json({ status: "400", msg: error });
  }
};
