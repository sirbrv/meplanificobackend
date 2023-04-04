module.exports = ( sequelize, DataTypes ) => {
 // console.log('crea modelo de user')
  const Clientes = sequelize.define("clientes", {
      nombreId: { type: DataTypes.STRING, allowNull: false},
      nombre: { type: DataTypes.STRING, allowNull: true, },
      direccion: { type: DataTypes.STRING, allowNull: true,},
      email: { type: DataTypes.STRING, allowNull: true, },
      numTelefono: { type: DataTypes.STRING, allowNull: true,},
      numTelefono1: { type: DataTypes.STRING, allowNull: true,},
      numTelefono2: {type: DataTypes.STRING, allowNull: true },
     /* price: Sequelize.DECIMAL,
        length: Sequelize.SMALLINT,
        rating: Sequelize.ENUM("G", "PG", "PG-13", "R", "NC-17"),*/
    }
    /*,
      {
          // This is to ensure that Sequelize
          // does not pluralize table names
          freezeTableName: true,
  
          // This is to ensure that Sequelize
          // does not add its own timestamp
          // variables in the query.
      /*   timestamps: false,
          createdAt: false,
          updatedAt: false,
      }
      */
  )
  return Clientes
};