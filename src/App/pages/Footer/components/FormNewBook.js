import { useBooksContext } from "../../../../context/BooksContext";
import Header from "../../Header/Header";
import styles from "./FormNewBook.module.scss";
import { useRef, useState } from "react";

export default function FormNewBook() {
  const { books } = useBooksContext();

  const form = useRef();

  const [newBook, setNewBook] = useState("");

  function formData(e) {
    e.preventDefault();
    const name = form.current.newBookName.value;
    const label = form.current.newBookLabel.value;
    const category = form.current.newBookCategory.value;
    const totalPages = form.current.newBookTotalPages.value;
    const summary = form.current.newBookSummary.value;
    setNewBook({ name, label, category, totalPages, summary });
  }

  return (
    <>
      <Header />
      <div className={styles["pageTitle"]}>
        {"Formulaire de soumission d'un nouveau livre"}
      </div>
      <form action="" ref={form} onSubmit={formData}>
        <div className={styles["element"]}>
          <label htmlFor={"bookName"}>
            {"Écrire le nom du livre tout en minuscules séparé de tirets"}
          </label>
          <input
            name="newBookName"
            id={"bookName"}
            type={"text"}
            placeholder={"le-livre-de-la-jungle"}
            required
          />
        </div>
        <div className={styles["element"]}>
          <label htmlFor={"bookLabel"}>{"Écrire le nom du livre"}</label>
          <input
            name="newBookLabel"
            id={"bookLabel"}
            type={"text"}
            placeholder={"Le livre de la Jungle"}
            required
          />
        </div>
        <div className={styles["element"]}>
          <label htmlFor={"bookCategory"}>
            {"Écrire la catégorie du livre"}
          </label>
          <input
            name="newBookCategory"
            id={"bookCategory"}
            type={"text"}
            placeholder={"Metro-Goldwyn-Mayer"}
            required
          />
        </div>
        <div className={styles["element"]}>
          <label htmlFor={"bookTotalPages"}>
            {"Écrire le nombre total de pages du livre"}
          </label>
          <input
            name="newBookTotalPages"
            id={"bookTotalPages"}
            type={"number"}
            placeholder={"350"}
            required
          />
        </div>
        <div className={styles["element"]}>
          <label htmlFor={"bookSummary"}>{"Écrire le résumé du livre"}</label>
          <input
            name="newBookSummary"
            id={"bookSummary"}
            type={"text"}
            required
          />
        </div>
        <button type="submit">{"Soumettre mon livre"}</button>
      </form>
    </>
  );
}
