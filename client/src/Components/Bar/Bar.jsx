// NavBar.jsx
import React from "react";
import styles from "./NavBar.module.css";

const Bar = ({ onLogout }) => {
  return (
    <div className={styles.navbar}>
      <span className={styles.welcome}>Bienvenido</span>
      <button className={styles.logoutButton} onClick={onLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default Bar;
