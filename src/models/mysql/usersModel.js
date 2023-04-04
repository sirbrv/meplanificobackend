module.exports = ( sequelize, DataTypes ) => {

  //console.log("crea modelo de users");
  
  const Users = sequelize.define("users", {
      IdUsuario: { type: DataTypes.STRING, allowNull: false, },
      nombre: { type: DataTypes.STRING, allowNull: true, },
      email: { type: DataTypes.STRING, allowNull: true, },
      rut: { type: DataTypes.INTEGER, allowNull: true,},
      rol: { type: DataTypes.STRING, allowNull: true,},
      direccion: { type: DataTypes.STRING, allowNull: true,},
      numTelefono: { type: DataTypes.STRING, allowNull: true,},
      userPassword: {type: DataTypes.STRING, allowNull: true },
      token: {type: DataTypes.STRING, allowNull: true }
  })

  return Users
};