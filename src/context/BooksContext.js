import React, { useState, useContext, useEffect } from "react";
import dataBooks from "../data/books";

const INITIAL_FILTERS = { category: "", search: "" };
const BooksContext = React.createContext({ books: [], addFavorite: () => {} });

export const useBooksContext = () => useContext(BooksContext);

export default function BooksContextProvider({ children }) {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filteredFavoriteBooks, setFilteredFavoriteBooks] = useState([]);

  const categories = dataBooks.reduce(
    (acc, book) =>
      acc.includes(book.category) ? acc : acc.concat(book.category),
    []
  );

  useEffect(() => {
    if (getLocalFilters()) {
      setFilters(getLocalFilters());
    }
    if (getLocalFavorites()) {
      setFavoriteBooks(getLocalFavorites());
    }
  }, []);

  useEffect(() => {
    setFilteredBooks(
      dataBooks
        .filter((book) => {
          if (filters.search) return book.name.includes(filters.search);
          else return book;
        })
        .filter(
          (book) => !filters.category || filters.category === book.category
        )
    );
  }, [filters]);

  useEffect(() => {
    setFilteredFavoriteBooks(
      favoriteBooks
        .filter((book) => {
          if (filteredBooks.name == favoriteBooks.name)
            return book.name.includes(filters.search);
          else return book;
        })
        .filter(
          (book) => !filters.category || filters.category === book.category
        )
    );
  }, [filteredBooks]);

  function onCategory(category) {
    setFilters((curr) => ({ ...curr, category }));
    saveLocalFilters({ ...filters, category });
  }

  function onSearch(search) {
    setFilters((curr) => ({ ...curr, search }));
    saveLocalFilters({ ...filters, search });
  }

  function onResetFilters() {
    setFilters(INITIAL_FILTERS);
    localStorage.removeItem("filters");
  }

  function addFavorite(name) {
    if (!favoriteBooks.filter((book) => book.name === name).length) {
      const books = [...favoriteBooks].concat(
        dataBooks.find((book) => book.name === name)
      );
      setFavoriteBooks(books);
      saveLocalFavorites(books);
    }
  }

  function removeFavorite(name) {
    const books = favoriteBooks.filter((book) => book.name !== name);
    setFavoriteBooks(books);
    saveLocalFavorites(books);
  }

  function saveLocalFilters(values) {
    localStorage.setItem("filters", JSON.stringify(values));
  }

  function getLocalFilters() {
    return JSON.parse(localStorage.getItem("filters"));
  }

  function saveLocalFavorites(values) {
    localStorage.setItem("favorites", JSON.stringify(values));
  }

  function getLocalFavorites() {
    return JSON.parse(localStorage.getItem("favorites"));
  }

  return (
    <BooksContext.Provider
      value={{
        books: dataBooks,
        categories,
        filters,
        filteredBooks,
        favoriteBooks,
        filteredFavoriteBooks,
        addFavorite,
        removeFavorite,
        onCategory,
        onSearch,
        onResetFilters,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}
