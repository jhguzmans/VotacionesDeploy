// NavBar.jsx
import React from "react";
import styles from "./Navbar.module.css";

const NavBar = ({ username, onLogout }) => {
  return (
    <div className={styles.navbar}>
      <span className={styles.welcome}>Bienvenido, {username}</span>
      <button className={styles.logoutButton} onClick={onLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default NavBar;
