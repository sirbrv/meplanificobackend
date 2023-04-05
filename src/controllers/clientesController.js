const { clientes } = require("../configDB/configDB");
const db = require("../configDB/configDB");
const Clientes = db.clientes
const Op = db.Sequelize.Op;

exports.getClientes = async (req, res) => {
 /* console.log("==========================================")
  console.log("req.body...", req.body)
  console.log("req.query...", req.query)
  console.log("==========================================") */
  var condition = {} ;
  let page = req.query.page ? req.query.page - 1 : 0;
  page = page < 0 ? 0 : page;
  let limit = parseInt(req.query.limit || 10);
  limit = limit < 0 ? 10 : limit;
  const offset = page * limit;
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
  ); */
  Clientes.findAndCountAll({
    where: { nombre: { [Op.like]: `%${search}%` } },
    limit,
    offset,
    //   attributes: ["id", "name",'address','created'],
  })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.json({
        status: "200",
        msg: "Clientes Registrados..",
        data: response,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error al leer Clientes..",
      });
    });
  };

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: clientes } = data;
    const currentPage = page > 0 ? page + 1 : 1 ;
    const totalPages = Math.ceil(totalItems / limit);
  return {  clientes, totalItems, totalPages, currentPage };
};

exports.createCliente = async (req, res) => {
  const existeCliente = await Clientes.findOne({ where: { nombreId: req.body.data.nombreClave } });
  if (existeCliente != null) {
    if (existeCliente) {
      return res.json({  status: "400",  msg: "El Cliente, ya está registrado"});
    }
  }

  const newClient = {
      nombreId: req.body.data.nombreClave,
      email: req.body.data.email,
      nombre: req.body.data.nombre,
      direccion: req.body.data.direccion,
      numTelefono: req.body.data.telefono,
      numTelefono1: req.body.data.telefono1,
      numTelefono2: req.body.data.telefono2
    }
  try {
    await Clientes.create(newClient);
    res.json({status: "201",msg: "El registro fue Creado",data: newClient});
  } catch (error) {
    res.json({status: "409",msg: error.message});
  }
};

exports.getcliente = async (req, res) => {
  let { id } = req.params;
  const existecliente = await Clientes.findOne({ where: { id: req.params.id  }  });
  if (!existecliente) {
    return res.json({ status: "404",  msg: "El Cliente, no está registrado"});
  }
  res.json({ status: "200", data: existecliente});
};

exports.updateCliente = async (req, res, next) => {
//  console.log("Entre a crear clientes....",req.body)
 // let dataClient = await Clientes.findOne({ where: { id: req.params.id }})
 //   if(dataClient){

          Clientes.update(
            {
              email: req.body.data.email,
              nombre: req.body.data.nombre,
              direccion: req.body.data.direccion,
              numTelefono: req.body.data.telefono,
              numTelefono1: req.body.data.telefono1,
              numTelefono2: req.body.data.telefono2     
            },  
            {
              where: {
                id: req.params.id,
              },
            }
          )
          .then(function () {
            res.json({status: "200",msg: "Actualización realizada exitosamente"});   
          })
          .catch(err => {res.json({status: "409",msg: err.message,});});
     //     console.log("Estoy aqui")
    
 // }
  }; 
    
exports.deleteCliente = async (req, res, next) => {
  const existeusuario = await Clientes.findOne({ where: { id: req.params.id  }  });
  if (!existeusuario) {
    return res.json({status: "404",msg: "El Cliente, no está registrado"});
  }
  try {
    await Clientes.destroy({ where: { id: req.params.id  }  });
    return res.json({status: "200",msg: "Registro Eliminado."});
  } catch (error) {
    res.json({status: "400",msg: error});
  }
};