import styles from "./App.module.scss";
import Livres from "./pages/books/Livres";
import logo from "../assets/livresLogo.jpg";

function App() {
  return (
    <div className={styles["page"]}>
      <div className={styles["pageTitle"]}>
        <h1>Le livre de livres</h1>
        <img src={logo} alt="logo de livres"></img>
      </div>

      <div className={styles["content"]}>
        {/* if / => books else if /books/:name => book(book) */}

        <Livres />
      </div>
    </div>
  );
}

export default App;
