import React from "react";
import { useBooksContext } from "../../../../../context/BooksContext";
import styles from "./Filters.module.scss";

export default function Filters() {
  const { categories, onCategory, onSearch, filters, onResetFilters } =
    useBooksContext();

  return (
    <div className={styles["filters"]}>
      <select
        value={filters.category}
        onChange={(e) => onCategory(e.target.value)}
      >
        <option value="">Toutes les catégories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <input
        type="search"
        placeholder="Un livre en particulier ?"
        value={filters.search}
        onChange={(e) => onSearch(e.target.value)}
      />
      <button onClick={onResetFilters}>Réinitialiser</button>
    </div>
  );
}
