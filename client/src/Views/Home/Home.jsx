import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import NavBar from "../../Components/NavBar/NavBar";
import Bar from "../../Components/Bar/Bar";
import PreguntaComponent from "../../Components/PreguntaComponent/PreguntaComponent";
import styles from "./Home.module.css";

const Home = () => {
  const onLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const userName = localStorage.getItem("usuario");
  const coeficiente = localStorage.getItem("coef");

  console.log("En el home, el userName es: ", userName);
  console.log("En el home, el user es: ", user);
  if (!userName) {
    navigate("/");
  }
  if (userName)
    return (
      <div className={styles.container}>
        <Bar onLogout={onLogout} coef={coeficiente} userName={userName} />
        <PreguntaComponent />
      </div>
    );
};
export default Home;
