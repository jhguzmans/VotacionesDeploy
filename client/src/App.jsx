import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Views/Login/Login";
import { useLocation } from "react-router-dom";
import Home from "./Views/Home/Home";
import Admin from "./Views/Admin/Admin";
import axios from "axios";
//comentario
axios.defaults.baseURL = "http://localhost:3001";
//axios.defaults.baseURL = "https://votacionesdeploy-production.up.railway.app";
function App() {
  const location = useLocation();
  const getAllLocalStorage = () => {
    let localStorageData = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      localStorageData[key] = value;
    }
    return localStorageData;
  };

  // Usar la función para obtener todos los datos del localStorage
  const allData = getAllLocalStorage();
  console.log("todo el local storage es: ", allData);
  let tipo = "";
  if (allData.tipo) {
    tipo = JSON.parse(allData.tipo);
  }
  return (
    <div>
      <Routes>
        {console.log("el tipo es: ", tipo)}
        {console.log("el tipo de 'tipo' es: ", typeof tipo)}

        {tipo === "propietario" && <Route path="/*" element={<Home />} />}

        {tipo === "admin" && <Route path="/*" element={<Admin />} />}

        {!(tipo === "propietario" || tipo === "admin") && (
          <Route path="*" element={<Login />} />
        )}
        {/* Redirección en caso de que no se cumpla ninguna ruta */}
        <Route path="home"element={<Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
