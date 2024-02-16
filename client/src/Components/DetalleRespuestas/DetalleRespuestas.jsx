import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postPregunta } from "../redux/actions";
import { Doughnut } from "react-chartjs-2";

const DetalleRespuestas = () => {
  const dispatch = useDispatch();
  const [ultimaPregunta, setUltimaPregunta] = useState(null);

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
  const [respuestas, setRespuestas] = useState([]);
  const [respuestasData, setRespuestasData] = useState({});

  const handleEnviarPregunta = async () => {
    // Enviar la pregunta al backend y obtener las respuestas
    const respuestasDelBackend = await dispatch(postPregunta({ pregunta }));

    // Actualizar el estado con las respuestas
    setRespuestas(respuestasDelBackend);

    // Crear los datos para el gráfico de torta
    const respuestasChartData = {
      labels: respuestasDelBackend.map((respuesta) => respuesta.texto),
      datasets: [
        {
          data: respuestasDelBackend.map((respuesta) => respuesta.cantidad),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#66ff66",
            "#6666ff",
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#66ff66",
            "#6666ff",
          ],
        },
      ],
    };

    setRespuestasData(respuestasChartData);
  };

  return (
    <div>
      <label>
        Pregunta:
        <input
          type="text"
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
        />
      </label>
      <button onClick={handleEnviarPregunta}>Enviar Pregunta</button>

      {respuestas.length > 0 && (
        <div>
          <h2>Respuestas</h2>
          <Doughnut data={respuestasData} />
        </div>
      )}
    </div>
  );
};

export default DetalleRespuestas;
