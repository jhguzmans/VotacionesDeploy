require("dotenv").config();
const { User } = require("../db.js");

const c_getUserById = async (userId) => {
  try {
    const sanitizedUserId = userId.replace(/['"]+/g, "");

    console.log("El usuario buscado es:", sanitizedUserId);

    // Realiza la búsqueda en la base de datos
    const dataDB = await User.findOne({
      where: { conjTorreApto: sanitizedUserId },
    });

    if (!dataDB) {
      console.log("No se encontró ningún usuario con el ID proporcionado.");
      return null; // o podrías lanzar un error si prefieres
    }

    console.log("El usuario encontrado es:", dataDB);

    return dataDB;
  } catch (error) {
    console.error("Error al buscar el usuario en la base de datos:", error);
    throw error;
  }
};

module.exports = c_getUserById;
