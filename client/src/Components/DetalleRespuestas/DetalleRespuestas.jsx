
import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import styles from "./DetalleRespuestas.module.css";

const DetalleRespuestas = () => {
  const [enunciado, setEnunciado] = useState([]);
  const [opcRespuesta, setOpcRespuesta] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [datos, setDatos] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);
  const [autoReload, setAutoReload] = useState(true); // Estado para controlar la recarga automática
  const [botonTexto, setBotonTexto] = useState("Cerrar pregunta"); // Estado para el texto del botón
const [totalVotos, setTotalVotos] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ultimaPreguntaResponse = await axios.get("/ultimaPregunta");
        setOpcRespuesta(ultimaPreguntaResponse.data.OpcionRespuesta);
        setEnunciado(ultimaPreguntaResponse.data.enunciado);

        const respuestasPromises =
          ultimaPreguntaResponse.data.OpcionRespuesta.map(async (opcion) => {
            const respuestaByIdResponse = await axios.get(
              `/respuestasById/?opcionId=${opcion.opcionId}`
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
        setTotalVotos(totalVotos);

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

    // Fetch data initially
    fetchData();

    // Set interval to fetch data every 5 seconds if autoReload is true
    let intervalId;
    if (autoReload) {
      intervalId = setInterval(fetchData, 2500);
    }

    return () => clearInterval(intervalId); // Cleanup the interval on unmount or when autoReload changes
  }, [autoReload]);

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
      <h2 className={styles.enunciado}>
        {enunciado ? enunciado : "Las respuestas son: "}
      </h2>
      <div className={styles.chartContainer}>
        <canvas id="tortaChart"></canvas>
      </div>
      <div className={styles.listaRespuestas}>
  {datos.map((dato, index) => (
  <div key={index} className={styles.respuestaItem}>
        <span
        className={styles.colorBox}
        style={{
        backgroundColor: chartData.datasets[0].backgroundColor[index],
        display: 'inline-block',
        width: '12px',
        height: '12px',
        borderRadius: '3px',
        marginRight: '8px',
        verticalAlign: 'middle',
      }}
    ></span>
    <span style={{ fontWeight: 'bold', color: chartData.datasets[0].backgroundColor[index] }}>
      {dato.opcion}:
    </span>{' '}
    <strong>{dato.votos.toFixed(4)}</strong>
  </div>
))}
</div>
<div className={styles.totalVotos}>
  Total: <strong>{totalVotos.toFixed(4)}</strong> coeficiente de votación. 
</div>
      <button
        className={styles.closeButton}
        onClick={() => {
          setAutoReload(false);
          setBotonTexto("Pregunta cerrada");
        }}
      >
        {botonTexto}
      </button>
    </div>
  );
};

export default DetalleRespuestas;
