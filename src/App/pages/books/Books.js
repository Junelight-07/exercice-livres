import styles from "./Books.module.scss";
import { bookList } from "../../../data/bookList";
import { useState } from "react";
import Categories from "./Categories/Categories";
import BookCard from "./BookCard/BookCard";

function Books() {
  const [activeCategory, setActiveCategory] = useState("");
  const categories = bookList.reduce(
    (acc, book) =>
      acc.includes(book.category) ? acc : acc.concat(book.category),
    []
  );

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
        {bookList
          .filter((book) => !activeCategory || activeCategory === book.category)
          .map((book) => (
            <a key={book.name} href={`/books/${book.name}`}>
              <BookCard {...book} />
            </a>
          ))}
      </div>
    </div>
  );
}

export default Books;
