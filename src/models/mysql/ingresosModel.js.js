module.exports = (sequelize, DataTypes) => {
  // console.log("crea modelo de ingresos");
  const Ingresos = sequelize.define("ingresos", {
    email: { type: DataTypes.STRING, allowNull: true },
    fecha: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    tipoIngreso: { type: DataTypes.STRING(2), allowNull: true },
    tipoIngresoDescripcion: { type: DataTypes.STRING, allowNull: true },
    descripcion: { type: DataTypes.TEXT, allowNull: false },
    condicion: { type: DataTypes.STRING(2), allowNull: true },
    condicionDescripcion: { type: DataTypes.STRING, allowNull: true },
    monto: { type: DataTypes.INTEGER, allowNull: true },
  });

  return Ingresos;
};
