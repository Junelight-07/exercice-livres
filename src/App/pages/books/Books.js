import styles from "./Books.module.scss";
import { useBooksContext } from "../../../context/BooksContext";
import { useState } from "react";
import Categories from "./components/Categories/Categories";
import BookCard from "./components/BookCard/BookCard";
import { Link, useSearchParams } from "react-router-dom";

function Books() {
  const { books, addFavorite } = useBooksContext();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const [activeCategory, setActiveCategory] = useState("");
  const categories = books.reduce(
    (acc, book) =>
      acc.includes(book.category) ? acc : acc.concat(book.category),
    []
  );

  return (
    <div className={styles["book"]}>
      <div className={styles["book-left"]}>
        <Link to={`/books/favorites`} className={styles["book-leftFavorites"]}>
          <div>Favoris</div>
        </Link>
      </div>
      <div className={styles["book-right"]}>
        <div className={styles["bookCategories"]}>
          <Categories
            categories={categories}
            setActiveCategory={setActiveCategory}
            activeCategory={activeCategory}
          />
        </div>
        <div className={styles["bookEncadrement"]}>
          {books
            .filter((book) => {
              if (search) return book.name.includes(search);
              else return book;
            })
            .filter(
              (book) => !activeCategory || activeCategory === book.category
            )
            .map((book) => (
              <div key={book.name} className={styles["bookCardEncadrement"]}>
                <Link to={`/books/${book.name}`}>
                  <BookCard {...book} />
                </Link>
                <button type="button" onClick={() => addFavorite(book.name)}>
                  Ajouter aux favoris
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Books;
