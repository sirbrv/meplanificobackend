module.exports = (sequelize, DataTypes) => {
  // console.log("crea modelo de tipoGastos");
  const TipoGastos = sequelize.define("tipoGastos", {
    email: { type: DataTypes.STRING, allowNull: true },
    descripcion: { type: DataTypes.STRING, allowNull: true },
  });
  return TipoGastos;
};
