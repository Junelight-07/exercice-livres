import React, { useState } from "react";
import uniqid from "uniqid";
import { Link } from "react-router-dom";
import { useBooksContext } from "../../../../context/BooksContext";
import Header from "../../Header/Header";
import styles from "./FormNewBook.module.scss";

export default function FormNewBook() {
  const { books, addBook } = useBooksContext();
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    label: "",
    category: "",
    pagesTotales: "",
    summary: "",
    favorite: false,
    pagesLues: "0",
  });

  const handleChangeFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function resetformData() {
    setFormData({
      name: "",
      label: "",
      category: "",
      pagesTotales: "",
      summary: "",
      favorite: false,
      pagesLues: "0",
    });
  }

  function formDataSubmit(e) {
    e.preventDefault();
    const bookExists = books.some((book) => book.name === formData.name);

    if (bookExists) {
      setSuccessMessage("Ce livre existe déjà dans la base de donnée");
    } else {
      addBook({
        id: uniqid("book-"),
        name: formData.name,
        label: formData.label,
        category: formData.category,
        pagesTotales: formData.pagesTotales,
        pagesLues: formData.pagesLues,
        favorite: formData.favorite,
        summary: formData.summary,
      });
      setSuccessMessage(
        "Votre livre a bien été enregistré dans la base de donnée"
      );
    }
    resetformData();
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
            <form data-testid="form" onSubmit={formDataSubmit}>
              <div>
                <label htmlFor={"bookName"}>
                  {
                    "Écrire le nom du livre tout en minuscules séparés de tirets"
                  }
                </label>
                <input
                  name={"name"}
                  value={formData.name}
                  onChange={handleChangeFormData}
                  data-testid={"bookName"}
                  type={"text"}
                  placeholder={"le-livre-de-la-jungle"}
                  required
                />
              </div>
              <div>
                <label htmlFor={"bookLabel"}>{"Écrire le nom du livre"}</label>
                <input
                  name={"label"}
                  value={formData.label}
                  onChange={handleChangeFormData}
                  data-testid={"bookLabel"}
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
                  name={"category"}
                  value={formData.category}
                  onChange={handleChangeFormData}
                  data-testid={"bookCategory"}
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
                  name={"pagesTotales"}
                  value={formData.pagesTotales}
                  onChange={handleChangeFormData}
                  data-testid={"bookTotalPages"}
                  type={"number"}
                  min={"1"}
                  placeholder={"350"}
                  required
                />
              </div>
              <div>
                <label htmlFor={"bookSummary"}>
                  {"Écrire le résumé du livre"}
                </label>
                <input
                  name={"summary"}
                  value={formData.summary}
                  onChange={handleChangeFormData}
                  data-testid={"bookSummary"}
                  type={"text"}
                  required
                />
              </div>
              <button data-testid={"bookSubmit"} type="submit">
                {"Soumettre mon livre"}
              </button>
            </form>
          </div>
        </div>
        {successMessage && (
          <div
            data-testid={"bookSuccessMessage"}
            className={styles["successMessage"]}
          >
            {successMessage}
          </div>
        )}
      </div>

      <Link
        data-testid={"bookReturnHome"}
        className={styles["bookReturnHome"]}
        to="/books"
      >
        {"Retourner au menu principal"}
      </Link>
    </>
  );
}
