import styles from "./App.module.scss";
import Nav from "../Nav/Nav";
import Livres from "../Livres/Livres";
import logo from "../assets/livresLogo.jpg";

function App() {
  return (
    <>
      <div className={styles["page"]}>
        <div className={styles["pageTitle"]}>
          <h1>Le livre de livres</h1>
          <img src={logo} alt="logo de livres"></img>
        </div>

        <div className={styles["content"]}>
          <Nav />
          <Livres />
        </div>
      </div>
    </>
  );
}

export default App;
