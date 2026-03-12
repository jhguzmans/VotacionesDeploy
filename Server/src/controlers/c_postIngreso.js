const { User } = require("../db");
const { Op } = require("sequelize");

const c_postIngreso = async (data) => {
  try {
    console.log("Lo que llega al controler en la data es: ", data);
    
    for (const apoderado of data.apoderados) {
      if (apoderado.selectedTorre !== "") {
        const apoderadoDB = await User.findOne({
          where: {
            conjTorreApto: `EL RECODO DEL PARQUE P. H.-${apoderado.selectedTorre}-${apoderado.selectedApto}`,
            //conjTorreApto: `La Castellana-${apoderado.selectedTorre}-${apoderado.selectedApto}`,
            
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
console.log("Para buscar propietarioDB, lo busca con: ");
console.log(`EL RECODO DEL PARQUE P. H.-${data.propietario.selectedTorre}-${data.propietario.selectedApto}`);


    const propietarioDB = await User.findOne({
      where: {
        conjTorreApto: `EL RECODO DEL PARQUE P. H.-${data.propietario.selectedTorre}-${data.propietario.selectedApto}`,
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
        conjTorreApto: `EL RECODO DEL PARQUE P. H.-${data.propietario.selectedTorre}-${data.propietario.selectedApto}`,
        //conjTorreApto: `Fiorento-${data.propietario.selectedTorre}-${data.propietario.selectedApto}`,
      },
    });

    return propietarioActualizado;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = c_postIngreso;
