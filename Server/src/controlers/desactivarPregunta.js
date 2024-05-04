const { Pregunta } = require("../models/Pregunta"); // Reemplaza "../models" con la ruta correcta a tus modelos

// Controlador para modificar el atributo activa de una pregunta
const desactivarPregunta = async (req, res) => {
  const { preguntaId } = req.params;

  try {
    const pregunta = await Pregunta.findByPk(preguntaId);

    if (!pregunta) {
      return res.status(404).json({ message: "Pregunta no encontrada" });
    }

    await pregunta.update({ activa: false });

    return res
      .status(200)
      .json({ message: "Pregunta desactivada correctamente" });
  } catch (error) {
    console.error("Error al desactivar pregunta:", error);
    return res.status(500).json({ message: "Error al desactivar pregunta" });
  }
};

module.exports = desactivarPregunta;
