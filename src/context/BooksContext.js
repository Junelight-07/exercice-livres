import React, { useState, useContext, useEffect } from "react";
import dataBooks from "../data/books";

const BooksContext = React.createContext({ books: [], addFavorite: () => {} });

export const useBooksContext = () => useContext(BooksContext);

export default function BooksContextProvider({ children }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (getBooks()) {
      setBooks(getBooks());
    } else {
      setBooks(dataBooks);
    }
  }, []);

  function filter() {}

  function clearFilter() {}

  function search() {}

  function clearSearch() {}

  function addFavorite(name) {
    const b = books.map((book) => {
      if (book.name === name) {
        return { ...book, favorite: true };
      } else {
        return book;
      }
    });
    setBooks(b);
    saveBooks(b);
  }

  function removeFavorite(name) {
    const b = books.map((book) => {
      if (book.name === name) {
        return { ...book, favorite: false };
      } else {
        return book;
      }
    });
    setBooks(b);
    saveBooks(b);
  }

  function saveBooks(b) {
    localStorage.setItem("books", JSON.stringify(b));
  }

  function getBooks() {
    return JSON.parse(localStorage.getItem("books"));
  }

  return (
    <BooksContext.Provider value={{ books, addFavorite, removeFavorite }}>
      {children}
    </BooksContext.Provider>
  );
}
