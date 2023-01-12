import { Link } from "react-router-dom";
import BookCard from "../BookCard/BookCard";
import { useBooksContext } from "../../../../../context/BooksContext";
import styles from "./Favorites.module.scss";

export default function Favorites() {
  const { books, removeFavorite } = useBooksContext();

  return (
    <div className={styles["favoriteContent"]}>
      <div className={styles["favoriteTitle"]}>Vos favoris</div>
      <div className={styles["favoriteResults"]}>
        {books.map((book) => {
          if (book.favorite) {
            return (
              <div
                key={book.name}
                className={styles["favoriteResultsEncadrement"]}
              >
                <div className={styles["favoriteResultsContent"]}>
                  <BookCard {...book} />
                </div>
                <button type="button" onClick={() => removeFavorite(book.name)}>
                  Supprimer des favoris
                </button>
              </div>
            );
          }
        })}
      </div>
      <Link className={styles["favoriteReturnHome"]} to="/books">
        Retourner au menu principal
      </Link>
    </div>
  );
}
