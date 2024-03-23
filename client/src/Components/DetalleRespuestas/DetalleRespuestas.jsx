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
            console.log("las respuestas son: ", respuestaByIdResponse);
            console.log(
              "respuestaByResponse.data es: ",
              respuestaByIdResponse.data
            );

            const votos = respuestaByIdResponse.data.reduce(
              (total, respuesta) => {
                const coeficiente = respuesta.coef
                  ? respuesta.coef.replace(/"/g, "")
                  : "0";
                return total + parseFloat(coeficiente);
              },
              0
            );

            console.log("Votos es: ", votos);

            return {
              textoOpcion: opcion.texto,
              opcionId: opcion.opcionId,
              votos: parseFloat(votos.toFixed(4)),
            };
          });

        const respuestas = await Promise.all(respuestasPromises);

        // Sumar los votos de todas las opciones
        const totalVotos = respuestas.reduce(
          (total, opcion) => total + opcion.votos,
          0
        );

        console.log("Total de votos:", totalVotos);

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
  if (ultimaPreguntaResponse.data) {
    console.log(
      "lo que descarga la ultima pregunta es: ",
      ultimaPreguntaResponse.data
    );
  }
  return (
    <div className={styles.container}>
      <h2>Las respuestas son:</h2>
      {/* <h2>{ultimaPreguntaResponse.data.enunciado}</h2> */}
      <div className={styles.chartContainer}>
        <canvas id="tortaChart"></canvas>
      </div>
    </div>
  );
};

export default DetalleRespuestas;
