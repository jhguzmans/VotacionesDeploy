import React, { useState, useEffect } from "react";
import styles from "./Llegada.module.css";
import { getConjs, getAptos, getTorres, ingreso } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Llegada = () => {
  const dispatch = useDispatch();
  const [selectedTorre, setSelectedTorre] = useState("");
  const [selectedApto, setSelectedApto] = useState("");
  const torres = useSelector((state) => state.torres);
  const aptos = useSelector((state) => state.aptos);
  const ingresos = useSelector((state) => state.ingreso);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTorres(selectedConj));
  }, [dispatch, selectedConj]);

  useEffect(() => {
    if (selectedTorre) {
      dispatch(getAptos(selectedTorre));
    }
  }, [dispatch, selectedTorre]);

  const handleTorreChange = (event) => {
    setSelectedTorre(event.target.value);
  };

  const handleAptoChange = (event) => {
    setSelectedApto(event.target.value);
  };

  useEffect(() => {
    dispatch(getTorres());
  }, [dispatch]);

  const handleSubmit = async (event) => {
    let username = "";
    username = " " + selectedTorre + "-" + selectedApto;
    dispatch();
    event.preventDefault();
    await dispatch(ingreso(credentials));
  };

  return (
    <div className={styles.container}>
      <h2>Las personas que han ingresado son: {ingresos}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {
          <label>
            Torre o interior:
            <select value={selectedTorre} onChange={handleTorreChange}>
              <option> Seleccionar la torre o el interior </option>
              {torres.map((torre, index) => (
                <option key={torre} value={torre}>
                  {torre}
                </option>
              ))}
            </select>
          </label>
        }
        {selectedTorre && (
          <label>
            Apartamento:
            <select value={selectedApto} onChange={handleAptoChange}>
              <option>Seleccionar el apartamento. </option>
              {aptos.map((apto, index) => (
                <option key={apto} value={apto}>
                  {apto}
                </option>
              ))}
            </select>
          </label>
        )}

        {<button type="submit">Enviar</button>}
      </form>
    </div>
  );
};

export default Llegada;
