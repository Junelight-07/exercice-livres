import React from "react";
import { useBooksContext } from "../../../../../context/BooksContext";
import styles from "./Filters.module.scss";

export default function Filters() {
  const { categories, onCategory, onSearch, filters, onResetFilters } =
    useBooksContext();
  return (
    <div className={styles["filters"]}>
      <select
        data-testid={"select"}
        value={filters.category}
        onChange={(e) => onCategory(e.target.value)}
      >
        <option value="">{"Toutes les catégories"}</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <input
        data-testid={"searchInput"}
        type="search"
        placeholder="Un livre en particulier ?"
        value={filters.search}
        onChange={(e) => onSearch(e.target.value)}
      />
      <button data-testid={"resetButton"} onClick={onResetFilters}>
        {"Réinitialiser"}
      </button>
    </div>
  );
}
