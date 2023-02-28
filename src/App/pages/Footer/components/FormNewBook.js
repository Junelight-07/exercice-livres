import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useBooksContext } from "../../../../context/BooksContext";
import Header from "../../Header/Header";
import styles from "./FormNewBook.module.scss";

export default function FormNewBook() {
  const { books, addBook } = useBooksContext();
  const [successMessage, setSuccessMessage] = useState("");

  const form = useRef();

  function formData(e) {
    e.preventDefault();
    const name = form.current.newBookName.value;
    const label = form.current.newBookLabel.value;
    const category = form.current.newBookCategory.value;
    const pagesTotales = form.current.newBookTotalPages.value;
    const summary = form.current.newBookSummary.value;
    const favorite = false;
    let pagesLues = 0;
    const bookExists = books.some((book) => book.name === name);

    if (bookExists) {
      setSuccessMessage("Ce livre existe déjà dans la base de donnée");
    } else {
      addBook({
        id: "okokok",
        name,
        label,
        category,
        pagesTotales,
        pagesLues,
        favorite,
        summary,
      });
      setSuccessMessage(
        "Votre livre a bien été enregistré dans la base de donnée"
      );
    }
  }

  return (
    <>
      <Header />
      <div className={styles["page"]}>
        <div className={styles["card"]}>
          <div className={styles["heading"]}>
            {"Formulaire de soumission d'un nouveau livre"}
          </div>
          <div className={styles["card2"]}>
            <form action="" ref={form} onSubmit={formData}>
              <div>
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
              <div>
                <label htmlFor={"bookLabel"}>{"Écrire le nom du livre"}</label>
                <input
                  name="newBookLabel"
                  id={"bookLabel"}
                  type={"text"}
                  placeholder={"Le livre de la Jungle"}
                  required
                />
              </div>
              <div>
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
              <div>
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
              <div>
                <label htmlFor={"bookSummary"}>
                  {"Écrire le résumé du livre"}
                </label>
                <input
                  name="newBookSummary"
                  id={"bookSummary"}
                  type={"text"}
                  required
                />
              </div>
              <button type="submit">{"Soumettre mon livre"}</button>
            </form>
          </div>
        </div>
        {successMessage && (
          <div className={styles["successMessage"]}>{successMessage}</div>
        )}
      </div>

      <Link className={styles["bookReturnHome"]} to="/books">
        {"Retourner au menu principal"}
      </Link>
    </>
  );
}
