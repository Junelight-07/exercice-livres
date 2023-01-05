import styles from "./Livres.module.scss";
import { bookList } from "../data/bookList";
import { useState } from "react";
import Categories from "./Categories/Categories";
import BookCard from "./BookCard/BookCard";

function Livres() {
  const categories = bookList.reduce(
    (acc, book) =>
      acc.includes(book.category) ? acc : acc.concat(book.category),
    []
  );
  const [activeCategory, setActiveCategory] = useState("");

  return (
    <div className={styles["book"]}>
      <div className={styles["bookCategories"]}>
        <Categories
          categories={categories}
          setActiveCategory={setActiveCategory}
          activeCategory={activeCategory}
        />
      </div>
      <div className={styles["bookEncadrement"]}>
        {bookList.map((book) =>
          !activeCategory || activeCategory === book.category ? (
            <BookCard
              key={book.name}
              pagesLues={book.pagesLues}
              pagesTotales={book.pagesTotales}
              name={book.name}
              cover={book.cover}
            />
          ) : null
        )}
      </div>
    </div>
  );
}

export default Livres;
