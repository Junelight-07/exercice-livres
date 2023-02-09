import { Link, useParams } from "react-router-dom";
import books from "../../../data/booksDatas";
import Header from "../Header/Header";
import styles from "./Book.module.scss";

export default function Book() {
  const { name } = useParams();
  const book = books.find((b) => b?.name === name);

  if (!book) return "book does not exist";
  return (
    <>
      <Header />
      <div className={styles["bookContent"]}>
        <div className={styles["bookTitle"]}>{book.label}</div>
        <div className={styles["bookSummary"]}>{book.summary}</div>
      </div>{" "}
      <Link className={styles["bookReturnHome"]} to="/books">
        Retourner au menu principal
      </Link>
    </>
  );
}
