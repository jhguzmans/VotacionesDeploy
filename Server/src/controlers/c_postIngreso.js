const { User } = require("../db");
const { Op } = require("sequelize");

const c_postIngreso = async (data) => {
  try {
    console.log("Lo que llega al controler en la data es: ", data);
    
    for (const apoderado of data.apoderados) {
      if (apoderado.selectedTorre !== "") {
        const apoderadoDB = await User.findOne({
          where: {
            conjTorreApto: `LA CASTELLANA PH-${apoderado.selectedTorre}-${apoderado.selectedApto}`,
            //conjTorreApto: `Fiorento-${apoderado.selectedTorre}-${apoderado.selectedApto}`,
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
        conjTorreApto: `LA CASTELLANA PH-${data.propietario.selectedTorre}-${data.propietario.selectedApto}`,
        //conjTorreApto: `Fiorento-${data.propietario.selectedTorre}-${data.propietario.selectedApto}`,
      },
    });
console.log("Lo que trae el propietario es: " , propietarioDB);

    if (propietarioDB) {
      await propietarioDB.update({
        ingresa: true,
        apoderado: JSON.stringify(data.apoderados),
      });
    }

    const propietarioActualizado = await User.findOne({
      where: {
        conjTorreApto: `LA CASTELLANA PH-${data.propietario.selectedTorre}-${data.propietario.selectedApto}`,
        //conjTorreApto: `Fiorento-${data.propietario.selectedTorre}-${data.propietario.selectedApto}`,
      },
    });

    return propietarioDB;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = c_postIngreso;
