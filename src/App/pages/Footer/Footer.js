import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <Link to={`/newbook`}>{"Soumettre un nouveau livre"}</Link>
    </footer>
  );
}
