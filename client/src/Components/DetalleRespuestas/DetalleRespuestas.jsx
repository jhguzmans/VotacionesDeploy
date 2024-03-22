// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Diagrama from "../Diagrama/Diagrama";

// const DetalleRespuestas = () => {
//   const [opcRespuesta, setOpcRespuesta] = useState([]);
//   const [chartData, setChartData] = useState(null);
//   const [datos, setDatos] = useState([]);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const ultimaPreguntaResponse = await axios.get(
//           "http://localhost:3001/ultimaPregunta"
//         );

//         setOpcRespuesta(ultimaPreguntaResponse.data.OpcionRespuesta);
//         console.log("las opciones de respuesta son: ", opcRespuesta);

//         // Mapear las opciones de respuesta y hacer una solicitud por cada una
//         const respuestasPromises =
//           ultimaPreguntaResponse.data.OpcionRespuesta.map(async (opcion) => {
//             const respuestaByIdResponse = await axios.get(
//               `http://localhost:3001/respuestasById/?opcionId=${opcion.opcionId}`
//             );
//             return {
//               textoOpcion: opcion.texto,
//               opcionId: opcion.opcionId,
//               votos: respuestaByIdResponse.data.length,
//             };
//           });

//         // Esperar a que se resuelvan todas las solicitudes
//         const respuestas = await Promise.all(respuestasPromises);

//         // Crear los datos para el gráfico de torta
//         const labels = respuestas.map(
//           (respuesta) => ` ${respuesta.textoOpcion}`
//         );
//         const data = respuestas.map((respuesta) => respuesta.votos);
//         setChartData({
//           labels: labels,
//           datasets: [
//             {
//               label: "Votos por opción",
//               data: data,
//               backgroundColor: [
//                 "rgba(255, 99, 132, 0.6)",
//                 "rgba(54, 162, 235, 0.6)",
//                 "rgba(255, 206, 86, 0.6)",
//                 "rgba(75, 192, 192, 0.6)",
//                 "rgba(153, 102, 255, 0.6)",
//               ],
//             },
//           ],
//         });
//       } catch (error) {
//         console.error("Error al obtener los datos:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (chartData) {
//       // Actualizas el estado de datos basado en chartData
//       setDatos(
//         chartData.datasets[0].data.map((votos, index) => ({
//           opcion: chartData.labels[index],
//           votos,
//         }))
//       );
//     }
//   }, [chartData]);
//   return (
//     <div>
//       <h2>Este es el detalle de respuestas</h2>
//       {console.log("Chardata es: ", chartData)}
//       <div>
//         <h2>Este es el detalle de respuestas</h2>
//         {chartData &&
//           chartData.datasets[0].data.map((votos, index) => (
//             <h3 key={index}>
//               Los votos para la opcion "{chartData.labels[index]}" son: {votos}
//             </h3>
//           ))}
//         {chartData && <Diagrama datos={datos} />}
//       </div>
//     </div>
//   );
// };

// export default DetalleRespuestas;
// DetalleRespuestas.jsx

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Chart from "chart.js/auto";
// import styles from "./DetalleRespuestas.module.css";

// const DetalleRespuestas = () => {
//   const [opcRespuesta, setOpcRespuesta] = useState([]);
//   const [chartData, setChartData] = useState(null);
//   const [datos, setDatos] = useState([]);
//   const [chartInstance, setChartInstance] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const ultimaPreguntaResponse = await axios.get(
//           "http://localhost:3001/ultimaPregunta"
//         );

//         setOpcRespuesta(ultimaPreguntaResponse.data.OpcionRespuesta);
//         console.log("las opciones de respuesta son: ", opcRespuesta);

//         // Mapear las opciones de respuesta y hacer una solicitud por cada una
//         const respuestasPromises =
//           ultimaPreguntaResponse.data.OpcionRespuesta.map(async (opcion) => {
//             const respuestaByIdResponse = await axios.get(
//               `http://localhost:3001/respuestasById/?opcionId=${opcion.opcionId}`
//             );
//             return {
//               textoOpcion: opcion.texto,
//               opcionId: opcion.opcionId,
//               votos: respuestaByIdResponse.data.length,
//             };
//           });

//         // Esperar a que se resuelvan todas las solicitudes
//         const respuestas = await Promise.all(respuestasPromises);

//         // Crear los datos para el gráfico de torta
//         const labels = respuestas.map(
//           (respuesta) => ` ${respuesta.textoOpcion}`
//         );
//         const data = respuestas.map((respuesta) => respuesta.votos);
//         setChartData({
//           labels: labels,
//           datasets: [
//             {
//               label: "Votos por opción",
//               data: data,
//               backgroundColor: [
//                 "rgba(255, 99, 132, 0.6)",
//                 "rgba(54, 162, 235, 0.6)",
//                 "rgba(255, 206, 86, 0.6)",
//                 "rgba(75, 192, 192, 0.6)",
//                 "rgba(153, 102, 255, 0.6)",
//               ],
//             },
//           ],
//         });
//       } catch (error) {
//         console.error("Error al obtener los datos:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (chartData && chartInstance) {
//       // Destruir el gráfico anterior
//       chartInstance.destroy();
//     }

//     // Actualizas el estado de datos basado en chartData
//     setDatos(
//       chartData.datasets[0].data.map((votos, index) => ({
//         opcion: chartData.labels[index],
//         votos,
//       }))
//     );

//     // Renderizar el gráfico usando Chart.js
//     if (chartData) {
//       const ctx = document.getElementById("tortaChart");
//       const newChartInstance = new Chart(ctx, {
//         type: "doughnut",
//         data: chartData,
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//         },
//       });

//       // Almacenar la instancia del gráfico en el estado
//       setChartInstance(newChartInstance);
//     }
//   }, [chartData]);

//   return (
//     <div className={styles.container}>
//       <h2>Este es el detalle de respuestas</h2>
//       <div className={styles.chartContainer}>
//         <canvas id="tortaChart"></canvas>
//       </div>
//     </div>
//   );
// };

// export default DetalleRespuestas;

// DetalleRespuestas.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import styles from "./DetalleRespuestas.module.css";

const DetalleRespuestas = () => {
  const [opcRespuesta, setOpcRespuesta] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [datos, setDatos] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ultimaPreguntaResponse = await axios.get("/ultimaPregunta");

        setOpcRespuesta(ultimaPreguntaResponse.data.OpcionRespuesta);
        console.log("las opciones de respuesta son: ", opcRespuesta);

        const respuestasPromises =
          ultimaPreguntaResponse.data.OpcionRespuesta.map(async (opcion) => {
            const respuestaByIdResponse = await axios.get(
              `/respuestasById/?opcionId=${opcion.opcionId}`
            );
            return {
              textoOpcion: opcion.texto,
              opcionId: opcion.opcionId,
              votos: respuestaByIdResponse.data.length,
            };
          });

        const respuestas = await Promise.all(respuestasPromises);

        const labels = respuestas.map(
          (respuesta) => ` ${respuesta.textoOpcion}`
        );
        const data = respuestas.map((respuesta) => respuesta.votos);
        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Votos por opción",
              data: data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
              ],
            },
          ],
        });
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartInstance) {
      // Destruir el gráfico anterior al desmontar el componente
      return () => {
        chartInstance.destroy();
      };
    }
  }, [chartInstance]);

  useEffect(() => {
    // Actualizar el estado de datos basado en chartData
    setDatos(
      chartData?.datasets[0].data.map((votos, index) => ({
        opcion: chartData.labels[index],
        votos,
      })) || []
    );

    // Renderizar el gráfico usando Chart.js
    if (chartData) {
      const ctx = document.getElementById("tortaChart");

      // Si ya hay una instancia del gráfico, destrúyela antes de crear una nueva
      if (chartInstance) {
        chartInstance.destroy();
      }

      const newChartInstance = new Chart(ctx, {
        type: "doughnut",
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });

      // Almacenar la instancia del gráfico en el estado
      setChartInstance(newChartInstance);
    }
  }, [chartData]);

  return (
    <div className={styles.container}>
      <h2>Este es el detalle de respuestas</h2>
      <div className={styles.chartContainer}>
        <canvas id="tortaChart"></canvas>
      </div>
    </div>
  );
};

export default DetalleRespuestas;
