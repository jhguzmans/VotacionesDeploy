// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import CrearPreguntaForm from "../../Components/CrearPreguntaForm/CrearPreguntaForm";
// import DetalleRespuestas from "../../Components/DetalleRespuestas/DetalleRespuestas";
// import Llegada from "../../Components/Llegada/Llegada";
// import Cuorum from "../../Components/Cuorum/Cuorum";
// import styles from "./Admin.module.css";
// // import NavBar from "../../Components/NavBar/NavBar";
// const Admin = () => {
//   const onLogout = () => {
//     localStorage.clear();
//     window.location.href = "/";
//   };
//   const user = useSelector((state) => state.user);
//   const userName = localStorage.getItem("usuario");

//   const [formularioHabilitado, setFormularioHabilitado] = useState(true);

//   const handleToggleFormulario = () => {
//     setFormularioHabilitado(!formularioHabilitado);
//   };

//   console.log("En el home el usuario del localStorage es: ", userName);

//   return (
//     <div className={styles.container}>
//       <div>{<Cuorum />}</div>
//       <div>{<Llegada />}</div>
//       <div>{<DetalleRespuestas />}</div>
//       <h2>prueba</h2>
//       <button>Holi</button>
//       <button onClick={handleToggleFormulario}>
//         {formularioHabilitado
//           ? "Deshabilitar Formulario"
//           : "Crear una nueva pregunta"}
//       </button>
//       {formularioHabilitado && <CrearPreguntaForm />}
//       {/* <div>
//         <NavBar onLogout={onLogout} />
//       </div> */}
//     </div>
//   );
// };

// export default Admin;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import CrearPreguntaForm from "../../Components/CrearPreguntaForm/CrearPreguntaForm";
import DetalleRespuestas from "../../Components/DetalleRespuestas/DetalleRespuestas";
import Llegada from "../../Components/Llegada/Llegada";
import Cuorum from "../../Components/Cuorum/Cuorum";
import styles from "./Admin.module.css";

const Admin = () => {
  const [seccionActiva, setSeccionActiva] = useState("cuorum");
  const [formularioHabilitado, setFormularioHabilitado] = useState(true);

  const handleToggleFormulario = () => {
    setFormularioHabilitado(!formularioHabilitado);
  };

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <button onClick={() => setSeccionActiva("cuorum")}>Cuorum</button>
        <button onClick={() => setSeccionActiva("llegada")}>Llegada</button>
        <button onClick={() => setSeccionActiva("detalleRespuestas")}>
          Detalle de Respuestas
        </button>
        <button onClick={() => setSeccionActiva("crearPregunta")}>
          Crear Pregunta
        </button>
        {/* <button onClick={handleToggleFormulario}>
          {formularioHabilitado ? "Deshabilitar Formulario" : "Crear Pregunta"}
        </button> */}
      </div>
      <div>
        {seccionActiva === "cuorum" && <Cuorum />}
        {seccionActiva === "llegada" && <Llegada />}
        {seccionActiva === "detalleRespuestas" && <DetalleRespuestas />}
        {seccionActiva === "crearPregunta" && (
          <div>{formularioHabilitado && <CrearPreguntaForm />}</div>
        )}
      </div>
    </div>
  );
};

export default Admin;
