const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("User", {
    conjTorreApto: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    ingresa: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    conj: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coef: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    torre: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    apto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    torreApto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    nameUser: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apoderado: {
      type: DataTypes.JSON, // Cambiado a JSON para permitir almacenamiento de objetos
      allowNull: true,
    },
    //  apoderado: {
    //    type: DataTypes.ARRAY(DataTypes.STRING),
    //    allowNull: true,
    //  },
  });
  //   User.hasMany(Respuesta, { foreignKey: "UserId" });
};
