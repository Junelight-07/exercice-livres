import styles from "./Categories.module.scss";
import { useState } from "react";
import React from "react";
import { useSearchParams } from "react-router-dom";

export default function Categories(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories, activeCategory, setActiveCategory } = props;
  const [inputValue, setInputValue] = useState("");

  const research = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (inputValue === "") {
      params.delete("search");
    } else {
      params.set("search", inputValue);
    }
    setSearchParams(params);
  };
  const reset = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.delete("search");
    setSearchParams(params);
    console.log(inputValue);
    setInputValue("");
  };
  return (
    <>
      <div id={styles["spaceBetween"]}>
        <select
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
        >
          <option value="">Toutes les catégories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button onClick={() => setActiveCategory("")}>Réinitialiser</button>
      </div>
      <form>
        <button type="submit" onClick={research}>
          Rechercher
        </button>
        <input
          type="search"
          placeholder="Un livre en particulier ?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />{" "}
        <button type="submit" onClick={reset}>
          Réinitialiser
        </button>
      </form>
    </>
  );
}
