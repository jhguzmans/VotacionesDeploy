import React, { useState, useEffect } from "react";
import styles from "./Llegada.module.css";
import { getAptos, getTorres } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Llegada = () => {
  const dispatch = useDispatch();
  const [selectedTorre, setSelectedTorre] = useState("");
  //const selectedTorre = 1;
  const torres = useSelector((state) => state.torres);
  const aptos = useSelector((state) => state.aptos);
  const [apoderados, setApoderados] = useState([
    //{ selectedTorre: 1, selectedApto: "" },
    //{ selectedTorre: 1, selectedApto: "" },
     { selectedTorre: "", selectedApto: "" },
     { selectedTorre: "", selectedApto: "" },
  ]); // Arreglo con 4 objetos vacíos
  const [poder, setPoder] = useState(false);
  const [propietario, setPropietario] = useState({
    selectedTorre: "",
    selectedApto: "",
  });

  useEffect(() => {
    dispatch(getTorres("La Castellana"));
    //dispatch(getTorres("Fiorento"));
  }, []);

  useEffect(() => {
    if (selectedTorre) {
      dispatch(getAptos(selectedTorre));
    }
  }, [dispatch, selectedTorre]);
  useEffect(() => {
    if (propietario.selectedTorre) {
      dispatch(getAptos(propietario.selectedTorre));
    }
  }, [dispatch, propietario.selectedTorre]);
  useEffect(() => {
    dispatch(getTorres());
  }, [dispatch]);

  const handleTorreChange = (event, index) => {
    if (poder) {
      setApoderados((prevState) =>
        prevState.map((apoderado, i) =>
          i === index
            ? { ...apoderado, selectedTorre: event.target.value }
            : apoderado
        )
      );
      console.log(selectedTorre);
    } else {
      setPropietario((prevState) => ({
        ...prevState,
        selectedTorre: event.target.value,
      }));
    }
  };

  const handleAptoChange = (event, index) => {
    const value = event.target.value;
    if (poder) {
      setApoderados((prevState) =>
        prevState.map((apoderado, i) =>
          i === index
            ? { ...apoderado, selectedApto: event.target.value }
            : apoderado
        )
      );
    } else {
      setPropietario((prevState) => ({ ...prevState, selectedApto: value }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const datos = {
      propietario,
      apoderados,
    };

    //fetch("http://localhost:3001/ingreso", {
    fetch("https://votacionesdeploy-production.up.railway.app/ingreso", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
    console.log(datos);
    alert("Los datos se han registrado correctamente."); // Mostrar alerta al completar el envío
    setPropietario({ selectedTorre: "", selectedApto: "" });
    setApoderados([
      { selectedTorre: "", selectedApto: "" },
      { selectedTorre: "", selectedApto: "" },
      // { selectedTorre: "", selectedApto: "" },
      // { selectedTorre: "", selectedApto: "" },
    ]);
    setPoder(false);
  };

  const handlePoderChange = () => {
    setPoder(!poder);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Propietario: </label>
        <div className={styles.containerUsuario}>
           {
            <label>
              Torre:
              <select
                value={propietario.selectedTorre}
                onChange={handleTorreChange}
              >
                <option> Seleccionar la torre o el interior </option>
                {[...torres]
  .map(Number) // Convertir a número si es necesario
  .sort((a, b) => a - b) // Ordenar numéricamente
  .map((torre) => (
    <option key={torre} value={torre}>
      {torre}
    </option>
  ))}
              </select>
            </label>
          } 
           {propietario.selectedTorre ? ( 
        //{selectedTorre ? (
            <label>
              Apartamento:
              <select
                value={propietario.selectedApto}
                onChange={handleAptoChange}
              >
                <option>Seleccionar el apartamento. </option>
                {aptos
                  .slice() // Hacer una copia del array para evitar mutaciones inesperadas
                  .sort((a, b) => parseInt(a) - parseInt(b)) // Ordenar numéricamente
                  .map((apto, index) => (
                    <option key={apto} value={apto}>
                      {apto}
                    </option>
                  ))}
              </select>
            </label>
          ) : (
            propietario.selectedTorre && (
              <label>
                Casa:
                <select
                  value={propietario.selectedApto}
                  onChange={handleAptoChange}
                >
                  <option>Seleccionar la casa. </option>
                  {aptos
                    .slice() // Hacer una copia del array para evitar mutaciones inesperadas
                    .sort((a, b) => parseInt(a) - parseInt(b)) // Ordenar numéricamente
                    .map((apto, index) => (
                      <option key={apto} value={apto}>
                        {apto}
                      </option>
                    ))}
                </select>
              </label>
            )
          )}
        </div>
        <div>
          <label>¿Es apoderado?</label>
          <input type="checkbox" checked={poder} onChange={handlePoderChange} />
        </div>
        {poder &&
          apoderados.map((apoderado, index) => (
            <div key={index}>
              <label>Apoderado {index + 1}: </label>
              <div className={styles.containerUsuario}>
                 <label>
                  Torre:
                  <select
                    value={apoderado.selectedTorre || ""}
                    onChange={(e) => handleTorreChange(e, index)}
                  >
                    <option> Seleccionar la torre o el interior </option>
                    {torres
  .sort((a, b) => Number(a) - Number(b)) // Ordenar como números
  .map((torre) => (
    <option key={torre} value={torre}>
      {torre}
    </option>
  ))}
                  </select>
                </label> 

                {apoderado.selectedTorre && (
                  <label>
                    Casa:
                    <select
                      value={apoderado.selectedApto || ""}
                      onChange={(e) => handleAptoChange(e, index)}
                    >
                      <option>Seleccionar la casa. </option>
                      {aptos
                        .slice() // Hacer una copia del array para evitar mutaciones inesperadas
                        .sort((a, b) => parseInt(a) - parseInt(b)) // Ordenar numéricamente
                        .map((apto, index) => (
                          <option key={apto} value={apto}>
                            {apto}
                          </option>
                        ))}
                    </select>
                  </label>
                )}
              </div>
            </div>
          ))}
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Llegada;
