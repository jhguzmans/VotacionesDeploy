import React from "react";
import styles from "./Bar.module.css";

const Bar = ({ onLogout, userName, coef }) => {
  return (
    <div className={styles.navbar}>
      <span className={styles.welcome}>
        Bienvenido {userName}, su coeficiente es: {coef}{" "}
      </span>
      {console.log("En el bar, la userName es: ", userName)}
      <button className={styles.logoutButton} onClick={onLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default Bar;
