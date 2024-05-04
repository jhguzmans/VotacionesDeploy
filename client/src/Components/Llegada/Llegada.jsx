import React, { useState, useEffect } from "react";
import styles from "./Llegada.module.css";
import { getAptos, getTorres, ingreso } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Llegada = () => {
  const dispatch = useDispatch();
  const [selectedTorre, setSelectedTorre] = useState("");
  const [selectedApto, setSelectedApto] = useState("");
  const torres = useSelector((state) => state.torres);
  const aptos = useSelector((state) => state.aptos);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTorres("La Finca SMZ 10"));
  }, [dispatch, selectedTorre]);

  useEffect(() => {
    if (selectedTorre) {
      dispatch(getAptos(selectedTorre));
    }
  }, [dispatch, selectedTorre]);

  useEffect(() => {
    dispatch(getTorres());
  }, [dispatch]);

  const handleTorreChange = (event) => {
    setSelectedTorre(event.target.value);
  };

  const handleAptoChange = (event) => {
    setSelectedApto(event.target.value);
  };

  const handleSubmit = (event) => {
    const username = selectedTorre + "-" + selectedApto;
    event.preventDefault();
    console.log("el username es: ", username);
    dispatch(ingreso(username));
    alert("Envío completado correctamente."); // Mostrar alerta al completar el envío
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {
          <label>
            Torre o interior:
            <select value={selectedTorre} onChange={handleTorreChange}>
              <option> Seleccionar la torre o el interior </option>
              {torres.sort().map(
                (
                  torre,
                  index // Ordena las torres antes de mapearlas
                ) => (
                  <option key={torre} value={torre}>
                    {torre}
                  </option>
                )
              )}
            </select>
          </label>
        }
        {selectedTorre && (
          <label>
            Apartamento:
            <select value={selectedApto} onChange={handleAptoChange}>
              <option>Seleccionar el apartamento. </option>
              {aptos.sort().map(
                (
                  apto,
                  index // Ordena las torres antes de mapearlas
                ) => (
                  <option key={apto} value={apto}>
                    {apto}
                  </option>
                )
              )}
            </select>
          </label>
        )}

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Llegada;
