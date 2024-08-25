const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Respuesta", {
    respuestaId: {
      type: DataTypes.INTEGER,
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
    pregIdUserId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    coef: {
      type: DataTypes.STRING,
    },
  });
};
