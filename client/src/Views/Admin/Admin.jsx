import React, { useState } from "react";
import { useSelector } from "react-redux";
import CrearPreguntaForm from "../../Components/CrearPreguntaForm/CrearPreguntaForm";
import DetalleRespuestas from "../../Components/DetalleRespuestas/DetalleRespuestas";
import styles from "./Admin.module.css"; // Importa tus estilos

const Admin = () => {
  const user = useSelector((state) => state.user);
  const userName = localStorage.getItem("usuario");

  const [formularioHabilitado, setFormularioHabilitado] = useState(true);

  const handleToggleFormulario = () => {
    setFormularioHabilitado(!formularioHabilitado);
  };

  console.log("En el home el usuario del localStorage es: ", userName);

  return (
    <div className={styles.container}>
      <div>{<DetalleRespuestas />}</div>
      <h2>prueba</h2>
      <button onClick={handleToggleFormulario}>
        {formularioHabilitado
          ? "Deshabilitar Formulario"
          : "Crear una nueva pregunta"}
      </button>
      {formularioHabilitado && <CrearPreguntaForm />}
    </div>
  );
};

export default Admin;
