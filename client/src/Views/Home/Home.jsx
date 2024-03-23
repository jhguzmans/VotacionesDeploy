import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/NavBar/NavBar";
import PreguntaComponent from "../../Components/PreguntaComponent/PreguntaComponent";
const Home = () => {
  const onLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const userName = localStorage.getItem("usuario");
  console.log("En el home, el userName es: ", userName);
  if (!userName) {
    navigate("/");
  }
  if (userName)
    return (
      <div>
        {userName && <NavBar onLogout={onLogout} />}
        <PreguntaComponent />
      </div>
    );
};
export default Home;
