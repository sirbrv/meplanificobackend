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
  console.log("...Estoy en encripta....")
  console.log("Clave.....", password);
  const salt    =  bcrypt.genSalt(10);
  const hash =  bcrypt.hash(password, 10);
  console.log("hash.....", hash);
  console.log("######################################")
  // const result = await bcrypt.compare(password, hash);
  return await hash;
};

exports.verifClave = async function (password, passwordDB) {
  console.log("...Estoy en comparar....")
  console.log("Clave.....", password);
  console.log("Clave.....", passwordDB);
   console.log("%%%%%%%%%%%%%%%%%%%%1%%%%%%%%%%%%%%%%%%%%%%%%")
 const match = await bcrypt.compare(password, passwordDB);
   console.log("match.....", match);
  console.log("%%%%%%%%%%%%%%%%%%%%%2%%%%%%%%%%%%%%%%%%%%%%%")
 return await match;
};
