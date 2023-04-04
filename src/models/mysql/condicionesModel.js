module.exports = (sequelize, DataTypes) => {
 // console.log("crea modelo de condiciones");
  const Condiciones = sequelize.define("condiciones", {
    email: { type: DataTypes.STRING, allowNull: true },
    tipo: { type: DataTypes.STRING(20), allowNull: true },
    descripcion: { type: DataTypes.STRING, allowNull: true },
  });

  return Condiciones;
};
