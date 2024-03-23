const axios = require("axios");
const { Activity } = require("../db");

const c_deleteActivity = async (id) => {
  try {
    console.log("hola mundo");
    console.log("en el controler, el id de la actividad es:00 ", id);
    // Buscar la actividad por su id
    const activity = await Activity.findByPk(id);
    console.log("En el controler la actividad a borrar es: ", activity);
    // Verificar si la actividad existe
    if (!activity) {
      throw new Error("No se encontró la actividad con el ID proporcionado.");
    }

    // Eliminar la actividad
    await activity.destroy();

    console.log("Actividad eliminada correctamente.");
  } catch (error) {
    console.error("Error al eliminar la actividad:", error.message);
  }
};

module.exports = c_deleteActivity;
