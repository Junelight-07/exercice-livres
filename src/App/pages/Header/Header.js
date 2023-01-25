import styles from "./Header.module.scss";
import logo from "../../../assets/livresLogo.jpg";

export default function Header() {
  return (
    <div className={styles["pageTitle"]}>
      <h1>Le livre de livres</h1>
      <img src={logo} alt="logo de livres" />
    </div>
  );
}
