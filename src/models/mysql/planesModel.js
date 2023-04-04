module.exports = (sequelize, DataTypes) => {
  // console.log("crea modelo de planes");

  const Planes = sequelize.define("planes", {
    email: { type: DataTypes.STRING, allowNull: true },
    fecha: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    year: { type: DataTypes.STRING(4), allowNull: true },
    mes: { type: DataTypes.STRING(12), allowNull: true },
    tipoGasto: { type: DataTypes.STRING(2), allowNull: true },
    tipoGastoDescripcion: { type: DataTypes.STRING, allowNull: true },
    monto: { type: DataTypes.INTEGER, allowNull: true },
  });

  return Planes;
};
