const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Pregunta", {
    preguntaId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    enunciado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activa: {
      type: DataTypes.BOOLEAN,
    },
  });
};
