const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("User", {
    conjTorreApto: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false,
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
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nameUser: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user2: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    idUser2: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    nameUser2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    apoderado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    idApoderado: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    nameApoderado: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  //   User.hasMany(Respuesta, { foreignKey: "UserId" });
};
