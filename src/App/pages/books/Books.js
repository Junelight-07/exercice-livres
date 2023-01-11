import styles from "./Books.module.scss";
import { bookList } from "../../../data/bookList";
import { useState } from "react";
import Categories from "./Categories/Categories";
import BookCard from "./BookCard/BookCard";
import { Link, useSearchParams } from "react-router-dom";

function Books() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const [activeCategory, setActiveCategory] = useState("");
  console.log(search);
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
          .filter((book) => {
            if (search) return book.name.includes(search);
            else return book;
          })
          .filter((book) => !activeCategory || activeCategory === book.category)
          .map((book) => (
            <div key={book.name} className={styles["bookCardEncadrement"]}>
              <Link to={`/books/${book.name}`}>
                <BookCard {...book} />
              </Link>
              <button>Ajouter aux favoris</button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Books;
