const { User } = require("../db");
const { Op } = require("sequelize");

const c_postIngreso = async (data) => {
  try {
    for (const apoderado of data.apoderados) {
      if (apoderado.selectedTorre !== "") {
        const apoderadoDB = await User.findOne({
          where: {
            conjTorreApto: `La Finca MZ 1-${apoderado.selectedTorre}-${apoderado.selectedApto}`,
          },
        });
        if (apoderadoDB) {
          await apoderadoDB.update({
            ingresa: true,
          });
        }
      }
    }

    const propietarioDB = await User.findOne({
      where: {
        conjTorreApto: `La Finca MZ 1-${data.propietario.selectedTorre}-${data.propietario.selectedApto}`,
      },
    });

    if (propietarioDB) {
      await propietarioDB.update({
        ingresa: true,
        apoderado: JSON.stringify(data.apoderados),
      });
    }

    const propietarioActualizado = await User.findOne({
      where: {
        conjTorreApto: `La Finca MZ 1-${data.propietario.selectedTorre}-${data.propietario.selectedApto}`,
      },
    });

    return propietarioDB;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = c_postIngreso;
