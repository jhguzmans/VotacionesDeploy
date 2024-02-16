import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
const userName = localStorage.getItem("usuario");

const NavBar = () => {
  const logout = () => console.log("cerrar sesion");
  const user = useSelector((state) => state.user);
  console.log("en el navBar, el userName del localStorage es: ", userName);
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#pregunta-actual">Pregunta Actual</Nav.Link>
          <Nav.Link href="#preguntas-anteriores">Preguntas Anteriores</Nav.Link>
        </Nav>
        <Navbar.Text className="mr-3">Bienvenido, {user.nameUser}</Navbar.Text>
        <Nav className="ml-auto">
          <Button onClick={logout} variant="outline-light">
            Cerrar Sesión
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
