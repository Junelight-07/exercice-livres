import styles from "./Header.module.scss";
import React from "react";

export default function Header() {
  return (
    <header className={styles["pageTitle"]}>
      <h1>Le livre de livres</h1>
      <img src={"/livresLogo.jpg"} alt="logo de livres" />
    </header>
  );
}
