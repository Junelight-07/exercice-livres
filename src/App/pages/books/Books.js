import { Link } from "react-router-dom";
import { useBooksContext } from "../../../context/BooksContext";
import Filters from "./components/Filters/Filters";
import BookCard from "./components/BookCard/BookCard";
import styles from "./Books.module.scss";

function Books() {
  const { filteredBooks } = useBooksContext();

  return (
    <div className={styles["books"]}>
      <div className={styles["books-menu"]}>
        <Filters />
        <Link to={`/books/favorites`}>
          <div>{"Favoris"}</div>
        </Link>
      </div>
      <div className={styles["book-cards"]}>
        {filteredBooks.map((book) => (
          <Link to={`/books/${book.name}`} key={book.name}>
            <BookCard {...book} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Books;
