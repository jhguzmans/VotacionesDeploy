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
    conjunto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activa: {
      type: DataTypes.BOOLEAN,
      allowNull: false, // Indica que no puede ser nulo
      defaultValue: true, // Valor por defecto es true
    },
  });
};
