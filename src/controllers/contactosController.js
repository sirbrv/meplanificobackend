const { contactos } = require("../configDB/configDB");
const db = require("../configDB/configDB");
const Contactos = db.contactos;
const Op = db.Sequelize.Op;

exports.getContactos = async (req, res) => {
 /* console.log("==========================================");
  console.log("req.body...", req.body);
  console.log("req.query...", req.query);
  console.log("=========================================="); */
  let page = req.query.page;
  let limit = parseInt(req.query.limit || 10);
  const offset = (page - 1) * limit;
  const search = req.query.sch;
 /* console.log(
    "Condicion..:",
    "offset..",
    offset,
    "limit ..",
    limit,
    "page...",
    page,
    "search..",
    search
  );v*/
  Contactos.findAndCountAll({
    where: { apellido: { [Op.like]: `%${search}%` } },
    limit,
    offset,
  })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.json({
        status: "200",
        msg: "Contactos Registrados..",
        data: response,
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Error al leer Contactos..",
      });
    });
};

const getPagingData = (data, page, limit) => {
  data;
 // console.log("Data.....,", data);
  const { count: totalItems, rows: contactos } = data;
  const currentPage = page > 0 ? page + 1 : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { contactos, totalItems, totalPages, currentPage, page };
};

exports.createContacto = async (req, res) => {
  //console.log("Entre a crear contactos....", req.body.data);
  /*    const existeContacto = await Contactos.findOne({ where: { apellido: req.body.data.apellido } });
    console.log("......salida...")
    if (existeContacto != null) {
        if (existeContacto) {
        return res.json({  status: "400",  msg: "El Contacto, ya está registrado"});
        }
    }
*/
  const newData = {
    nombre: req.body.data.nombre,
    apellido: req.body.data.apellido,
    numTelefono: req.body.data.numTelefono,
    email: req.body.data.email,
    comentario: req.body.data.comentario,
    terminos: req.body.data.terminos,
  };
 // console.log("newData..", newData);
  try {
    await Contactos.create(newData);
    res.json({ status: "201", msg: "El registro fue Creado", data: newData });
  } catch (error) {
   // console.log("Todo mal...", error);
    res.json({ status: "409", msg: error.message });
  }
};

exports.getContacto = async (req, res) => {
  let { id } = req.params;
  const existeContacto = await Contactos.findOne({
    where: { id: req.params.id },
  });
  if (!existeContacto) {
    return res.json({ status: "404", msg: "El Contacto, no está registrado" });
  }
  res.json({ status: "200", data: existeContacto });
};

exports.updateContacto = async (req, res, next) => {
 // console.log("Entre a crear Contactos....", req.body);
  Contactos.update(
    {
      email: req.body.data.email,
      nombre: req.body.data.nombre,
      comentario: req.body.data.comentario,
      numTelefono: req.body.data.numTelefono,
      terminos: req.body.data.terminos,
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
  // console.log("Estoy aqui");
};

exports.deleteContacto = async (req, res, next) => {
  const existeusuario = await Contactos.findOne({
    where: { id: req.params.id },
  });
  if (!existeusuario) {
    return res.json({ status: "404", msg: "El Contacto, no está registrado" });
  }
  try {
    await Contactos.destroy({ where: { id: req.params.id } });
    return res.json({ status: "200", msg: "Registro Eliminado." });
  } catch (error) {
    res.json({ status: "400", msg: error });
  }
};
