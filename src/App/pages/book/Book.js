import { useParams } from "react-router-dom";
import { bookList } from "../../../data/bookList";
import styles from "./Book.module.scss";
import { Link, useSearchParams } from "react-router-dom";

export default function Book() {
  const { name } = useParams();
  const book = bookList.find((bookListBook) => bookListBook?.name === name);

  if (!book) return "book does not exist";
  return (
    <>
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
