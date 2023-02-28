import { useBooksContext } from "../../../../../context/BooksContext";
import styles from "./BookCard.module.scss";

export default function BookCard({
  name,
  pagesLues,
  pagesTotales,
  label,
  cover,
}) {
  const { addFavorite, removeFavorite, favoriteBooks, updateReadPageBook } =
    useBooksContext();
  const isFavorite = favoriteBooks.filter(
    (bookName) => bookName === name
  ).length;

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
        <img
          className={styles["cover"]}
          src={cover}
          alt={`cover de '${label}'`}
        />
        <div className={styles["name"]}>{label}</div>
        <div className={styles["pagesLu"]} onClick={(e) => e.preventDefault()}>
          {"Vous avez lu"}
          <input
            type={"number"}
            min={"0"}
            max={pagesTotales}
            defaultValue={pagesLues}
            onChange={(e) => updateReadPageBook(name, e.target.value)}
          />
          {"pages"}
        </div>
        <ProgressBar value={(pagesLues / pagesTotales) * 100} />
        {pagesLues === pagesTotales && <div>{"Félicitation"}</div>}
        <div className={styles["text"]}>
          {`Vous avez lu ${pagesLues} page${
            pagesLues > 1 ? "s" : ""
          } sur ${pagesTotales}`}
        </div>
      </div>
      <div
        className={styles["actionOnFavorite"]}
        onClick={(e) => handleChangeFavorite(e, name)}
      >
        <input
          type="checkbox"
          checked="checked"
          className={styles["favorite"]}
          name="favorite-checkbox"
          value="favorite-button"
        />
        <label for="favorite" className={styles["container"]}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={styles["feather feather-heart"]}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <div className={styles["action"]}>
            <span className={styles["option"]}>{`${
              !isFavorite ? "Ajouter aux" : "Supprimer des"
            } favoris`}</span>
          </div>
        </label>
      </div>
    </div>
  );
}

function ProgressBar({ max = 100, value }) {
  return <progress max={max} value={value} />;
}
