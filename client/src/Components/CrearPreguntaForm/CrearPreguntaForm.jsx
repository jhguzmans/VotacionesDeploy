import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { crearPregunta } from "../../redux/actions";

const CrearPreguntaForm = () => {
  const dispatch = useDispatch();
  const [enunciado, setEnunciado] = useState("");
  const [opcionesRespuesta, setOpcionesRespuesta] = useState(["", ""]);

  const handleTextoChange = (index, texto) => {
    const nuevasOpciones = [...opcionesRespuesta];
    nuevasOpciones[index] = texto;
    setOpcionesRespuesta(nuevasOpciones);
  };

  const handleAgregarOpcion = () => {
    setOpcionesRespuesta([...opcionesRespuesta, ""]);
  };

  const handleCrearPregunta = () => {
    const pregunta = {
      enunciado,
      opcionesRespuesta: opcionesRespuesta.map((texto) => ({ texto })),
    };

    // Dispatch de la acción "crearPregunta"
    dispatch(crearPregunta(pregunta));

    // Limpiar el formulario después de enviar la pregunta
    setEnunciado("");
    setOpcionesRespuesta(["", ""]);
  };

  return (
    <div>
      <h2>Crear Nueva Pregunta</h2>
      <label>
        Enunciado:
        <input
          type="text"
          value={enunciado}
          onChange={(e) => setEnunciado(e.target.value)}
        />
      </label>
      <br />
      <label>Opciones de Respuesta:</label>
      <ul>
        {opcionesRespuesta.map((texto, index) => (
          <li key={index}>
            <input
              type="text"
              value={texto}
              onChange={(e) => handleTextoChange(index, e.target.value)}
            />
          </li>
        ))}
      </ul>
      <button onClick={handleAgregarOpcion}>Agregar Opción</button>
      <br />
      <button onClick={handleCrearPregunta}>Crear Pregunta</button>
    </div>
  );
};

export default CrearPreguntaForm;
