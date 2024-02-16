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
      // references: {
      //   model: "Pregunta",
      //   key: "preguntaId",
      // },
    },
    // Asociación con OpcionRespuesta
    opcionRespuestaId: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: "OpcionRespuesta",
      //   key: "opcionId",
      // },
    },
    // Asociación con User
    userId: {
      type: DataTypes.STRING,
      // references: {
      //   model: "User",
      //   key: "idUser",
      // },
    },
  });

  //   Respuesta.belongsTo(Pregunta, { foreignKey: "PreguntaId" });
  //   Respuesta.belongsTo(OpcionRespuesta, { foreignKey: "OpcionRespuestaId" });
  //   Respuesta.belongsTo(User, { foreignKey: "UserId" });
};
