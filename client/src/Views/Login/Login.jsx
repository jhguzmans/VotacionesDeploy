import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { getConjs, getAptos, getTorres, loginUser } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logoImagen from "../../images/votaConjVert.png";

const Login = () => {
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedConj, setSelectedConj] = useState("");
  const [selectedTorre, setSelectedTorre] = useState("");
  //const selectedTorre = 1;
  const [selectedApto, setSelectedApto] = useState("");
  const [password, setPassword] = useState("");
  const conjs = useSelector((state) => state.conjs);
  const torres = useSelector((state) => state.torres);
  const aptos = useSelector((state) => state.aptos);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedConj) {
      if (selectedConj.includes("dminist")) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      dispatch(getTorres(selectedConj));
    }
  }, [dispatch, selectedConj]);

  useEffect(() => {
    if (selectedTorre) {
      dispatch(getAptos(selectedTorre));
    }
  }, [dispatch, selectedTorre]);

  const handleConjChange = (event) => {
    setSelectedConj(event.target.value);
  };

     const handleTorreChange = (event) => {
       setSelectedTorre(event.target.value);
     };

  const handleAptoChange = (event) => {
    setSelectedApto(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  useEffect(() => {
    dispatch(getConjs());
  }, [dispatch]);

  

  const handleSubmit = async (event) => {
    event.preventDefault(); // Moverlo al inicio para evitar ejecuciones innecesarias
    
    let username = isAdmin ? `${selectedConj} 1-1` : `${selectedConj}-${selectedTorre}-${selectedApto}`;
    const credentials = { username, password };
    
    console.log("Credenciales enviadas:", credentials);
    
    await dispatch(loginUser(credentials)); // No intentamos leer `user` inmediatamente después
  };
  
  // Redirección después de que `user` se actualice
  useEffect(() => {
    if (user) {
      console.log("Usuario autenticado:", user);
  
      // Guardamos solo si `user` tiene valores válidos
      localStorage.setItem("usuario", JSON.stringify(user.conjTorreApto || ""));
      localStorage.setItem("tipo", JSON.stringify(user.tipo || ""));
      localStorage.setItem("coef", JSON.stringify(user.coef || ""));
  
      // Redirección según el tipo de usuario
      navigate(user.tipo === "propietario" ? "/home" : "/homeAdmin");
    }
  }, [user, navigate]); // Se ejecuta solo cuando `user` cambia

 return (
  <div className={styles.container}>
    <div className={styles.card}>
      
      <div className={styles.logoContainer}>
        <img src={logoImagen} alt="Logo" />
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Conjunto:
          <select value={selectedConj} onChange={handleConjChange}>
            <option>Seleccionar el conjunto</option>
            {conjs.map((conj) => (
              <option key={conj} value={conj}>
                {conj}
              </option>
            ))}
          </select>
        </label>

        {selectedConj && !isAdmin && (
          <label>
            Torre o interior:
            <select value={selectedTorre} onChange={handleTorreChange}>
              <option>Seleccione la torre</option>
              {torres
                .sort((a, b) => Number(a) - Number(b))
                .map((torre) => (
                  <option key={torre} value={torre}>
                    {torre}
                  </option>
                ))}
            </select>
          </label>
        )}

        {selectedTorre && !isAdmin && (
          <label>
            Apartamento:
            <select value={selectedApto} onChange={handleAptoChange}>
              <option>Seleccione el apartamento</option>
              {aptos.sort().map((apto) => (
                <option key={apto} value={apto}>
                  {apto}
                </option>
              ))}
            </select>
          </label>
        )}

        {(selectedApto || isAdmin) && (
          <label>
            Contraseña (4 dígitos):
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              maxLength="4"
            />
          </label>
        )}

        {password.length > 3 && (
          <button type="submit">Ingresar</button>
        )}
      </form>

    </div>
  </div>
);
};

export default Login;
