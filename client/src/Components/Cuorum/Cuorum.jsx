import React, { useState, useEffect } from "react";
import styles from "./Cuorum.module.css";
import axios from "axios";
const Cuorum = () => {
  const [quorum, setQuorum] = useState(null);
  useEffect(() => {
    const fetchQuorum = async () => {
      try {
        const response = await axios.get("/cuorum");
        setQuorum(response.data);
      } catch (error) {
        console.error("Error al obtener el quorum:", error);
      }
    };

    fetchQuorum();
  }, []); // El segundo argumento [] indica que este efecto se ejecutará solo una vez, al montar el componente

  return (
    <div className={styles.container}>
      <div>
        {quorum ? <p>El quorum es: {quorum}</p> : <p>Cargando quorum...</p>}
      </div>{" "}
    </div>
  );
};

export default Cuorum;
