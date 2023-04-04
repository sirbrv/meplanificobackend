module.exports = ( sequelize, DataTypes ) => {
// ********************************************///
  const Contactos = sequelize.define("contactos", {
      nombre: { type: DataTypes.STRING, allowNull: true, },
      apellido: { type: DataTypes.STRING, allowNull: false},
      numTelefono: { type: DataTypes.STRING, allowNull: true,},
      email: { type: DataTypes.STRING, allowNull: true, },
      comentario: { type: DataTypes.TEXT, allowNull: true,},
      terminos: { type: DataTypes.BOOLEAN, allowNull: false,},
    }

  )

  return Contactos
  
};