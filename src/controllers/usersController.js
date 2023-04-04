const db = require("../configDB/configDB");
const Users = db.users;
const bcrypt = require("bcrypt");

const {
  generaId,
  generarJWT,
  encriptar,
  verifClave,
} = require("../servicios/generarJwt");
const { token } = require("morgan");

exports.usersController = async (req, res) => {
  const usuarios = await Users.findAll({});
  // console.log("Usuarios ", usuarios);
  if (usuarios.length > 0) {
    res.json({ status: "200", msg: "Usuarios Registrados..", data: usuarios });
  } else {
    res.json({ status: "409", msg: "No hay Información Registrada" });
  }
};

exports.usersController = async (req, res) => {
  /* console.log("==========================================");
  console.log("req.body...", req.body);
  console.log("req.query...", req.query);
  console.log("=========================================="); */
  var condition = {};
  let page = req.query.page ? req.query.page - 1 : 0;
  page = page < 0 ? 0 : page;
  let limit = parseInt(req.query.limit || 10);
  limit = limit < 0 ? 10 : limit;
  const offset = page * limit;

  Users.findAndCountAll({
    where: condition,
    limit,
    offset,
    //   attributes: ["id", "name",'address','created'],
  })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      //    console.log(response)
      res.json({
        status: "200",
        msg: "Usuarios Registrados..",
        data: response,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "No hay Información Registrada..",
      });
    });
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: users } = data;
  const currentPage = page > 0 ? page + 1 : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { users, totalItems, totalPages, currentPage };
};

exports.createUsers = async (req, res) => {
  const encriClave = await bcrypt.hash(req.body.data.userPassword, 10);
  // console.log("Entre a crear registro....", req.body.data);
  const existeUsuario = await Users.findOne({
    where: { email: req.body.data.IdUsuario },
  });
  // console.log("......existeUsuario...", existeUsuario)
  if (existeUsuario) {
    return res.json({ status: "400", msg: "El usuario ya está registrado" });
  }
  if (req.body.data.contrasena) {
    encriClave = await bcrypt.hash(req.body.data.contrasena, 10);
  }
  const newUser = {
    IdUsuario: req.body.data.IdUsuario,
    email: req.body.data.email,
    nombre: req.body.data.nombre,
    rut: req.body.data.rut,
    rol: req.body.data.rol,
    direccion: req.body.data.direccion,
    numTelefono: req.body.data.numTelefono,
    userPassword: encriClave,
    token: generaId(),
  };
  try {
    await Users.create(newUser);
    res.json({ status: "201", msg: "El registro fué Creado", data: newUser });
  } catch (error) {
    res.json({ status: "409", msg: error.message });
  }
};

exports.loginUser = async (req, res) => {
  // const { email, contrasena } = req.body.data;
  //console.log("req.body.data....", req.body.data);
  const existeusuario = await Users.findOne({
    where: { email: req.body.data.IdUsuario },
  });
  // console.log("......existeusuario...", existeusuario);
  if (!existeusuario) {
    return res.json({ status: "404", msg: "El usuario no está registrado" });
  }
  const verific = await bcrypt.compare(
    req.body.data.claveUsuario,
    existeusuario.userPassword
  );
  if (!verific) {
    return res.json({ status: "403", msg: "Contraseña incorrecta.." });
  }
  const data = {
    id: existeusuario.id,
    usuario: existeusuario.IdUsuario,
    nombre: existeusuario.nombre,
    email: existeusuario.email,
    rol: existeusuario.rol,
    token: generarJWT(existeusuario.id),
    login: true,
  };
  // console.log("Login....:", data);
  res.json({ status: "200", data: data });
};

exports.getUsers = async (req, res) => {
  // console.log(req.params);
  //  let { id } = req.params;
  // console.log("Parametros. get.:", req.params.id);
  const existeusuario = await Users.findOne({ where: { id: req.params.id } });
  // console.log(existeusuario);
  if (!existeusuario) {
    return res.json({ status: "404", msg: "El ID no está registrado" });
  }
  res.json({ status: "200", data: existeusuario });
};

exports.updateUser = async (req, res, next) => {
  // console.log("req.body.data....", req.body);
  await Users.findOne({ where: { id: req.params.id } }).then((user) => {
    if (user) {
      let existeusuario = {
        email: req.body.data.email,
        nombre: req.body.data.nombre,
        rut: req.body.data.rut,
        rol: req.body.data.rol,
        direccion: req.body.data.direccion,
        numTelefono: req.body.data.numTelefono,
      };
      //  console.log("...existe.....usuario...", existeusuario);
      const user_data = user
        .update(existeusuario)
        .then(function () {
          res.json({
            status: "200",
            data: user_data,
            msg: "Actualización realizada exitosamente",
          });
        })
        .catch((err) => {
          res.json({ status: "500", msg: err.message });
        });
    }
  });
};

exports.deleteUser = async (req, res, next) => {
  const existeusuario = await Users.findOne({ where: { id: req.params.id } });
  if (!existeusuario) {
    return res.json({ status: "404", msg: "El ID no está registrado" });
  }
  try {
    await Users.destroy({ where: { id: req.params.id } });
    return res.json({ status: "200", msg: "Registro Eliminado." });
  } catch (error) {
    res.json({ status: "400", msg: error });
  }
};

exports.cambioClaveUser = async (req, res) => {
  // console.log("Entre a cambio....", req.body.data);
  let existeusuario = "";

  await Users.findOne({ where: { email: req.body.data.IdUsuario } })
    .then((user) => {
      if (user) {
        existeusuario = {
          email: user.email,
          nombre: user.nombre,
          rut: user.rut,
          rol: user.rol,
          direccion: user.direccion,
          numTelefono: user.numTelefono,
          token: user.token,
          userPassword: user.userPassword,
        };
      }
    })
    .catch((err) => {
      res.json({ status: "500", msg: err.message });
    });

  if (existeusuario) {
    const verific = await bcrypt.compare(
      req.body.data.claveUsuario,
      existeusuario.userPassword
    );
    if (!verific) {
      return res.json({ status: "403", msg: "Clave actual incorrecta..." });
    } else {
      const encrClave = await bcrypt.hash(req.body.data.claveNueva, 10);
      existeusuario.userPassword = encrClave;
      await Users.findOne({
        where: { email: req.body.data.IdUsuario },
      }).then((user) => {
        if (user) {
          //  console.log("...existeusuario...", existeusuario);
          const user_data = user
            .update(existeusuario)
            .then(function () {
              res.json({
                status: "200",
                msg: "Contraseña Actualizada Correctamente...",
              });
            })
            .catch((err) => {
              res.json({ status: "500", msg: err.message });
            });
        }
      });
    }
  } else {
    return res.json({
      status: "404",
      msg: "El Usuario, no está Registrado...",
    });
  }
};

exports.tokenUsers = async (req, res) => {
  await Users.findOne({ where: { token: req.params.token } })
    .then((user) => {
      if (user) {
        let existeusuario = {
          token: "",
          statu: "activo",
        };
        const user_data = user
          .update(existeusuario)
          .then(function () {
            res.json({
              status: "200",
              data: user_data,
              msg: "Usuario Confirmado Correctamente",
            });
          })
          .catch((err) => {
            res.json({ status: "500", msg: err.message });
          });
      }
    })
    .catch((err) => {
      return res.json({ status: "404", msg: "Token no válido" });
    });
};

exports.olvidePassword = async (req, res) => {
  await Users.findOne({ where: { email: req.body.data.email } })
    .then((user) => {
      user.token = generaId();
      let nombre = user.nombre.trim() + " " + user.apellido.trim();
      envioMail(req.body.data.email, nombre, user.token);
      const wuser = user;
      user
        .update(wuser)
        .then(function () {
          res.json({
            status: "200",
            msg: "Se envió email a su Correo Electrónico, para que genere la nueva contraseña..",
          });
        })
        .catch((err) => {
          res.json({ status: "500", msg: err.message });
        });
    })
    .catch((err) => {
      return res.json({ status: "403", msg: "El Email no está registrado" });
    });
};

exports.olvidePasswordToken = async (req, res, next) => {
  const existeusuario = await Users.findOne({
    where: { token: req.params.token },
  });
  if (!existeusuario) {
    return res.json({
      status: "404",
      msg: "Token no valido",
    });
  }
  next();
};
