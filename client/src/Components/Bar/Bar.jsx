import React from "react";
import styles from "./Bar.module.css";

const Bar = ({ onLogout, userName, coef }) => {
  return (
    <div className={styles.navbar}>
      {userName && !userName.toLowerCase().includes("admin") && (
        <span className={styles.welcome}>
          Bienvenido {userName}, su coeficiente es: {coef ? coef.toString().slice(1, 7) : ""}
        </span>
      )}
      {console.log("En el bar, la userName es: ", userName)}
      <button className={styles.logoutButton} onClick={onLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default Bar;
