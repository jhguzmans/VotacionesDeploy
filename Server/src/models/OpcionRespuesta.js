const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("OpcionRespuesta", {
    opcionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    texto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
//OpcionRespuesta.hasMany(Respuesta, { foreignKey: "OpcionRespuestaId" });
