const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Respuesta", {
    respuestaId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    preguntaId: {
      type: DataTypes.INTEGER,
    },
    opcionRespuestaId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.STRING,
    },
    coef: {
      type: DataTypes.STRING,
    },
  });
};
