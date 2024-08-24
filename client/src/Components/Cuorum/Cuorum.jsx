// import React, { useState, useEffect } from "react";
// import styles from "./Cuorum.module.css";
// import axios from "axios";
// const Cuorum = () => {
//   const [quorum, setQuorum] = useState(null);
//   useEffect(() => {
//     console.log("Aquí se montó el componente");

//     const fetchQuorum = async () => {
//       try {
//         const response = await axios.get("/cuorum");
//         console.log("Aquí hizo la petición y lo que llegó es: ", response.data);

//         setQuorum(response.data);
//       } catch (error) {
//         console.error("Error al obtener el quorum:", error);
//       }
//     };

//     fetchQuorum();
//   }, []); // El segundo argumento [] indica que este efecto se ejecutará solo una vez, al montar el componente

//   return (
//     <div className={styles.container}>
//       <div className={styles.quorum}>
//         {quorum ? <p>El quorum es: {quorum}</p> : <p>Cargando quorum...</p>}
//       </div>{" "}
//     </div>
//   );
// };

// export default Cuorum;

import React, { useState, useEffect } from "react";
import styles from "./Cuorum.module.css";
import axios from "axios";

const Cuorum = () => {
  const [quorum, setQuorum] = useState(null);

  useEffect(() => {
    console.log("Aquí se montó el componente");

    const fetchQuorum = async () => {
      try {
        const response = await axios.get("/cuorum");
        console.log("Aquí hizo la petición y lo que llegó es: ", response.data);
        setQuorum(response.data);
      } catch (error) {
        console.error("Error al obtener el quorum:", error);
      }
    };

    // Llamar a fetchQuorum inmediatamente
    fetchQuorum();

    // Configurar el intervalo para actualizar el quorum cada 2 segundos
    const intervalId = setInterval(fetchQuorum, 10000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []); // El segundo argumento [] indica que este efecto se ejecutará solo una vez, al montar el componente

  return (
    <div className={styles.container}>
      <div className={styles.quorum}>
        {quorum ? <p>El quorum es: {quorum}</p> : <p>Cargando quorum...</p>}
      </div>
    </div>
  );
};

export default Cuorum;
