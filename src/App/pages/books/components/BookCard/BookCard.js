import { useBooksContext } from "../../../../../context/BooksContext";
import styles from "./BookCard.module.scss";

export default function BookCard({
  name,
  pagesLues,
  pagesTotales,
  label,
  cover,
  isFavorite,
}) {
  const { addFavorite, removeFavorite } = useBooksContext();

  function handleChangeFavorite(e, name) {
    e.preventDefault();
    if (!isFavorite) {
      addFavorite(name);
    } else {
      removeFavorite(name);
    }
  }

  return (
    <div className={styles["book-card"]}>
      <div className={styles["content"]}>
        <img className={styles["cover"]} src={cover} alt={`cover ${label}`} />
        <div className={styles["name"]}>{label}</div>
        <ProgressBar value={(pagesLues / pagesTotales) * 100} />
        {pagesLues === pagesTotales && <div>{"Félicitation"}</div>}
        <div className={styles["text"]}>
          {`Vous avez lu ${pagesLues} page${
            pagesLues > 1 ? "s" : ""
          } sur ${pagesTotales}`}
        </div>
      </div>
      <div className={styles["actions"]}>
        <button type="button" onClick={(e) => handleChangeFavorite(e, name)}>
          {`${!isFavorite ? "Ajouter aux" : "Supprimer des"} favoris`}
        </button>
      </div>
    </div>
  );
}

function ProgressBar({ max = 100, value }) {
  return <progress max={max} value={value} />;
}
