module.exports = (sequelize, DataTypes) => {
  // console.log("crea modelo de tipoIngresos");
  const TipoIngresos = sequelize.define("tipoIngresos", {
    email: { type: DataTypes.STRING, allowNull: true },
    descripcion: { type: DataTypes.STRING, allowNull: true },
  });
  return TipoIngresos;
};
