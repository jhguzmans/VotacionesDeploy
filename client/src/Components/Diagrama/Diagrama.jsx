import React, { useEffect } from "react";
import style from "./Diagrama.module.css";

const Diagrama = ({ datos }) => {
  useEffect(() => {
    const totalVotos = datos.reduce((total, dato) => total + dato.votos, 0);

    let anguloInicial = -90; // Comenzamos desde arriba
    let estilos = "";
    datos.forEach((dato, index) => {
      const porcentaje = (dato.votos / totalVotos) * 100;
      const angulo = (360 * porcentaje) / 100;

      estilos += `
        .${style["pie-piece-" + index]} {
          background-color: var(--color-${index + 1});
          clip-path: polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 50% 100%);
          transform: rotate(${anguloInicial}deg);
        }
      `;

      anguloInicial += angulo;
    });

    const styleElement = document.createElement("style");
    styleElement.innerHTML = estilos;
    document.head.appendChild(styleElement);
  }, [datos]);

  return (
    <div className={style.chart}>
      {datos.map((dato, index) => (
        <div key={index} className={style["pie-piece-" + index]}></div>
      ))}
    </div>
  );
};

export default Diagrama;
