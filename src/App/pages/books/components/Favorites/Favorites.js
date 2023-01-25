import { Link } from "react-router-dom";
import BookCard from "../BookCard/BookCard";
import { useBooksContext } from "../../../../../context/BooksContext";
import styles from "./Favorites.module.scss";
import Filters from "../Filters/Filters";
import Header from "../../../Header/Header";

export default function Favorites() {
  const { books, filteredFavoriteBooks } = useBooksContext();
  console.log(filteredFavoriteBooks);
  return (
    <>
      <Header />
      <div className={styles["favorite"]}>
        <div className={styles["title"]}>{"Vos favoris"}</div>
        <Filters />
        <div className={styles["book-cards"]}>
          {books
            .filter((book) => filteredFavoriteBooks.includes(book.name))
            .map((book) => (
              <Link to={`/books/${book.name}`} key={book.name}>
                <BookCard {...book} />
              </Link>
            ))}
        </div>
        <Link className={styles["favoriteReturnHome"]} to="/books">
          Retourner au menu principal
        </Link>
      </div>
    </>
  );
}
