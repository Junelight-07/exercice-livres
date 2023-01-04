import styles from "./BookCard.module.scss";

export default function BookCard({ book }) {
  return (
    <div className={styles["bookCard"]}>
      <img
        className={styles["book-item-cover"]}
        src={book.cover}
        alt={`${book.name} cover`}
      />
      <div className={styles["bookName"]}>{book.name}</div>
    </div>
  );
}
