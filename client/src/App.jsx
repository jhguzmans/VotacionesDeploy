import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Views/Login/Login";
import { useLocation } from "react-router-dom";
import Home from "./Views/Home/Home";
import Admin from "./Views/Admin/Admin";
function App() {
  const location = useLocation();

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login />} />

        <Route exact path="/home" element={<Home />} />
        <Route exact path="/homeAdmin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
