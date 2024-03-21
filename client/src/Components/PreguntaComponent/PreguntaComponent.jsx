import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./PreguntaComponent.module.css";
const user = localStorage.getItem("usuario");
const coef = localStorage.getItem("coef");

const PreguntaComponent = () => {
  console.log("en pregunta component el user es: ", user);
  const [yaVoto, setYaVoto] = useState(false);
  const [ultimaPregunta, setUltimaPregunta] = useState(null);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ultimaPreguntaResponse = await axios.get(
          "http://localhost:3001/ultimaPregunta"
        );
        setUltimaPregunta(ultimaPreguntaResponse.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const preguntaId = ultimaPregunta.preguntaId;
        console.log("en PreguntaComponent, preguntaId es: ", preguntaId);
        const yaVotoResponse = await axios.get(
          `http://localhost:3001/yavoto?user=${user}&preguntaId=${preguntaId}`
        );
        console.log("la respuesta de YaVoto es; ", yaVotoResponse.data);
        setYaVoto(yaVotoResponse.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchData();
  }, [ultimaPregunta]);

  const handleSeleccionarRespuesta = (opcionId) => {
    setRespuestaSeleccionada(opcionId);
  };

  const handleEnviarRespuesta = async () => {
    if (respuestaSeleccionada !== null) {
      try {
        const respuesta = {
          preguntaId: ultimaPregunta.preguntaId,
          opcionId: respuestaSeleccionada,
          user,
          coef,
        };
        console.log("lo que se envía de respuesta es: ", respuesta);
        await axios.post("http://localhost:3001/enviarRespuesta", respuesta);
        setYaVoto(true);
        alert("Respuesta enviada con éxito");
      } catch (error) {
        console.error("Error al enviar la respuesta:", error);
      }
    } else {
      alert("Por favor, selecciona una opción de respuesta antes de enviar.");
    }
  };

  return (
    <div className={styles.container}>
      {ultimaPregunta ? (
        <>
          <h2>Pregunta:</h2>
          <p>{ultimaPregunta.enunciado}</p>
          {yaVoto ? (
            <h3>Usted ya ha votado.</h3>
          ) : (
            <h3>Opciones de Respuesta:</h3>
          )}
          {!yaVoto && (
            <ul>
              {ultimaPregunta.OpcionRespuesta.map((opcion) => (
                <li key={opcion.opcionId}>
                  <label>
                    <input
                      type="radio"
                      name="respuesta"
                      value={opcion.opcionId}
                      onChange={() =>
                        handleSeleccionarRespuesta(opcion.opcionId)
                      }
                    />
                    {opcion.texto}
                  </label>
                </li>
              ))}
            </ul>
          )}
          <button onClick={handleEnviarRespuesta}>Enviar Respuesta</button>
        </>
      ) : (
        <p>No hay preguntas disponibles</p>
      )}
    </div>
  );
};

export default PreguntaComponent;
