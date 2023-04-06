const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.generarJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

exports.generaId = () => {
  const random = Math.random().toString(32).substring(2);
  const fecha = Date.now().toString(32);
  return random + fecha;
};

exports.encriptar = async (password) => {
  const salt    =  bcrypt.genSalt(10);
  const hash =  bcrypt.hash(password, 10);
  return await hash;
};

exports.verifClave = async function (password, passwordDB) {
 const match = await bcrypt.compare(password, passwordDB);
 return await match;
};
