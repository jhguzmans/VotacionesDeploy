// // module.exports = c_postIngreso;
// const { User } = require("../db");
// const { Op } = require("sequelize");

// const c_postIngreso = async (data) => {
//   try {
//     // Calcular el coeficiente total de los apoderados
//     let coeficienteApoderados = 0;
//     for (const apoderado of data.apoderados) {
//       if (apoderado.selectedTorre !== "") {
//         const apoderadoDB = await User.findOne({
//           where: {
//             torreApto: `${apoderado.selectedTorre}-${apoderado.selectedApto}`,
//           },
//         });
//         if (apoderadoDB && apoderadoDB.coef) {
//           coeficienteApoderados += parseFloat(apoderadoDB.coef);
//         }
//       }
//     }

//     // Actualizar el coeficiente del propietario
//     const propietarioDB = await User.findOne({
//       where: {
//         torreApto: `${data.propietario.selectedTorre}-${data.propietario.selectedApto}`,
//       },
//     });
//     if (propietarioDB && propietarioDB.coef) {
//       await propietarioDB.update({
//         coef: parseFloat(propietarioDB.coef) + coeficienteApoderados,
//         ingresa: true,
//       });
//     }

//     return propietarioDB;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

// module.exports = c_postIngreso;
const { User } = require("../db");
const { Op } = require("sequelize");

const c_postIngreso = async (data) => {
  try {
    for (const apoderado of data.apoderados) {
      if (apoderado.selectedTorre !== "") {
        // Buscar al apoderado en la base de datos
        const apoderadoDB = await User.findOne({
          where: {
            torreApto: `${apoderado.selectedTorre}-${apoderado.selectedApto}`,
          },
        });

        // Si el apoderado existe, actualizar el atributo ingresa y sumar su coeficiente
        if (apoderadoDB) {
          // Actualizar el atributo ingresa a true
          await apoderadoDB.update({
            ingresa: true,
          });
        }
      }
    }

    // Actualizar el coeficiente del propietario y su atributo ingresa a true
    const propietarioDB = await User.findOne({
      where: {
        torreApto: `${data.propietario.selectedTorre}-${data.propietario.selectedApto}`,
      },
    });

    if (propietarioDB) {
      await propietarioDB.update({
        ingresa: true,
        apoderado: JSON.stringify(data.apoderados),
      });
    }
    console.log("el propietarioDB.apoderado es:", propietarioDB.apoderado);

    return propietarioDB;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = c_postIngreso;
