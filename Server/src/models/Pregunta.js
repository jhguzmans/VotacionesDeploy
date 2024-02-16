const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
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
  });
  //   Pregunta.hasMany(Respuesta, { foreignKey: "PreguntaId" });
};
