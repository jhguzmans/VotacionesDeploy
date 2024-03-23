// NavBar.jsx
import React from "react";
import styles from "./Navbar.module.css";

const NavBar = ({ onLogout }) => {
  return (
    <div className={styles.navbar}>
      <span className={styles.welcome}>Bienvenido</span>
      <button className={styles.logoutButton} onClick={onLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default NavBar;
