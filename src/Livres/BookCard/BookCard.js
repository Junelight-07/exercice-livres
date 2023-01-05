import styles from "./BookCard.module.scss";

export default function BookCard({ pagesLues, pagesTotales, name, cover }) {
  return (
    <div className={styles["bookCard"]}>
      <img
        className={styles["book-item-cover"]}
        src={cover}
        alt={`${name} cover`}
      />
      <div className={styles["bookName"]}>{name}</div>
      <ProgressBar value={(pagesLues / pagesTotales) * 100} />
      <div>
        Vous avez lu {pagesLues} page{pagesLues > 1 && "s"} sur {pagesTotales}
      </div>
    </div>
  );
}

function ProgressBar({ max = 100, value }) {
  return <progress max={max} value={value} />;
}
