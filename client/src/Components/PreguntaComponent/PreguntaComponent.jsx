// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import styles from "./PreguntaComponent.module.css";

// const PreguntaComponent = () => {
//   const user = localStorage.getItem("usuario");
//   const coef = localStorage.getItem("coef");
//   console.log("en pregunta component el user es: ", user);
//   const [yaVoto, setYaVoto] = useState(false);
//   const [ultimaPregunta, setUltimaPregunta] = useState(null);
//   const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const ultimaPreguntaResponse = await axios.get("/ultimaPregunta");
//         setUltimaPregunta(ultimaPreguntaResponse.data);
//       } catch (error) {
//         console.error("Error al obtener los datos:", error);
//       }
//     };

//     fetchData();
//   }, []);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const preguntaId = ultimaPregunta.preguntaId;
//         console.log("en PreguntaComponent, preguntaId es: ", preguntaId);
//         const yaVotoResponse = await axios.get(
//           `/yavoto?user=${user}&preguntaId=${preguntaId}`
//         );
//         console.log("la respuesta de YaVoto es; ", yaVotoResponse.data);
//         setYaVoto(yaVotoResponse.data);
//       } catch (error) {
//         console.error("Error al obtener los datos:", error);
//       }
//     };
//     fetchData();
//   }, [ultimaPregunta]);

//   const handleSeleccionarRespuesta = (opcionId) => {
//     setRespuestaSeleccionada(opcionId);
//   };

//   const handleEnviarRespuesta = async () => {
//     if (respuestaSeleccionada !== null) {
//       try {
//         const respuesta = {
//           preguntaId: ultimaPregunta.preguntaId,
//           opcionId: respuestaSeleccionada,
//           user,
//           coef,
//         };
//         console.log("lo que se envía de respuesta es: ", respuesta);
//         await axios.post("/enviarRespuesta", respuesta);
//         setYaVoto(true);
//         alert("Respuesta enviada con éxito");
//       } catch (error) {
//         console.error("Error al enviar la respuesta:", error);
//       }
//     } else {
//       alert("Por favor, selecciona una opción de respuesta antes de enviar.");
//     }
//   };

//   return (
//     <div className={styles.container}>
//       {ultimaPregunta ? (
//         <>
//           <h2>Pregunta:</h2>
//           <p>{ultimaPregunta.enunciado}</p>
//           {yaVoto ? (
//             <h3>Usted ya ha votado.</h3>
//           ) : (
//             <h3>Opciones de Respuesta:</h3>
//           )}
//           {!yaVoto && (
//             <ul>
//               {ultimaPregunta.OpcionRespuesta.map((opcion) => (
//                 <li key={opcion.opcionId}>
//                   <label>
//                     <input
//                       type="radio"
//                       name="respuesta"
//                       value={opcion.opcionId}
//                       onChange={() =>
//                         handleSeleccionarRespuesta(opcion.opcionId)
//                       }
//                     />
//                     {opcion.texto}
//                   </label>
//                 </li>
//               ))}
//               <button onClick={handleEnviarRespuesta}>Enviar Respuesta</button>
//             </ul>
//           )}
//         </>
//       ) : (
//         <p>No hay preguntas disponibles</p>
//       )}
//     </div>
//   );
// };

// export default PreguntaComponent;
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./PreguntaComponent.module.css";

const PreguntaComponent = () => {
  const user = localStorage.getItem("usuario");
  const coef = localStorage.getItem("coef");
  const [yaVoto, setYaVoto] = useState(false);
  const [ultimaPregunta, setUltimaPregunta] = useState(null);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [apoderados, setApoderados] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ultimaPreguntaResponse = await axios.get("/ultimaPregunta");
        setUltimaPregunta(ultimaPreguntaResponse.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const verificarVoto = async () => {
      if (ultimaPregunta) {
        try {
          const preguntaId = ultimaPregunta.preguntaId;
          console.log("en PreguntaComponent, preguntaId es: ", preguntaId);
          console.log("en PreguntaComponent, user es: ", user);
          const yaVotoResponse = await axios.get(
            `/verificarVoto?userId=${user}&preguntaId=${preguntaId}`
          );
          console.log(
            "en PreguntaComponent, yaVotoResponse es: ",
            yaVotoResponse.data
          );

          if (yaVotoResponse.data.length > 0) {
            setYaVoto(true);
          }
        } catch (error) {
          console.error("Error al verificar si ya votó:", error);
        }
      }
    };

    verificarVoto();
  }, [ultimaPregunta]);
  useEffect(() => {
    if (!user) return; 
    fetch(
      `https://votacionesdeploy-production.up.railway.app/getUserById?userId=${user}`,
      {
        //fetch(`http://localhost:3001/getUserById?userId=${user}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Datos del usuario:", data);
        setApoderados(JSON.parse(data.apoderado));
      })
      .catch((error) => {
        console.error("Hubo un error al obtener el usuario:", error.message);
      });
  }, [user]);

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
        await axios.post("/enviarRespuesta", respuesta);
        setYaVoto(true);
        alert("Respuesta enviada con éxito");
      } catch (error) {
        alert("No es permitido votar mas de una vez.");
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
              {apoderados && (
                <h4>
                  Recuerde que usted tambien esta realizando la votación por:
                </h4>
              )}
              {apoderados && apoderados[0] && (
                <p>Casa {apoderados[0].selectedApto}</p>
              )}
              {apoderados && apoderados[1] && (
                <p>Casa {apoderados[1].selectedApto}</p>
              )}
              <button onClick={handleEnviarRespuesta}>Enviar Respuesta</button>
            </ul>
          )}
        </>
      ) : (
        <p>No hay preguntas disponibles</p>
      )}
    </div>
  );
};

export default PreguntaComponent;
