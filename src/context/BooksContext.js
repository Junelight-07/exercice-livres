import React, { useState, useContext, useEffect } from "react";
import dataBooks from "../data/booksDatas";

const INITIAL_FILTERS = { category: "", search: "" };
const BooksContext = React.createContext({ books: [], addFavorite: () => {} });

export const useBooksContext = () => useContext(BooksContext);

export default function BooksContextProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filteredFavoriteBooks, setFilteredFavoriteBooks] = useState([]);

  const categories = books.reduce(
    (acc, book) =>
      acc.includes(book.category) ? acc : acc.concat(book.category),
    []
  );

  useEffect(() => {
    if (getLocalBooks()) {
      setBooks(getLocalBooks());
    } else {
      setBooks(dataBooks);
      saveLocalBooks(dataBooks);
    }
    if (getLocalFilters()) {
      setFilters(getLocalFilters());
    }
    if (getLocalFavorites()) {
      setFavoriteBooks(getLocalFavorites());
    }
  }, []);

  useEffect(() => {
    setFilteredBooks(
      books
        .filter((book) => {
          if (filters.search) return book.name.includes(filters.search);
          else return book;
        })
        .filter(
          (book) => !filters.category || filters.category === book.category
        )
    );
  }, [books, filters]);

  useEffect(() => {
    setFilteredFavoriteBooks(
      favoriteBooks
        .filter((bookName) => bookName.includes(filters.search))
        .filter((bookName) => {
          const findedBook = books.find((b) => b.name === bookName);
          if (!filters.category || filters.category === findedBook.category)
            return bookName;
        })
    );
  }, [filteredBooks, favoriteBooks]);

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

  function addBook(book) {
    const newBooks = [...books, book];
    setBooks(newBooks);
    saveLocalBooks(newBooks);
  }

  function addFavorite(name) {
    if (!favoriteBooks.filter((book) => book.name === name).length) {
      const updatedBooks = [...favoriteBooks];
      updatedBooks.push(name);
      setFavoriteBooks(updatedBooks);
      saveLocalFavorites(updatedBooks);
    }
  }

  function removeFavorite(name) {
    const updatedBooks = favoriteBooks.filter((bookName) => bookName !== name);
    setFavoriteBooks(updatedBooks);
    saveLocalFavorites(updatedBooks);
  }

  function updateReadPageBook(name, pages) {
    const updatedBooks = books.map((book) => {
      if (book.name === name) {
        return {
          ...book,
          pagesLues: pages,
        };
      } else return book;
    });
    setBooks(updatedBooks);
    saveLocalBooks(updatedBooks);
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

  function saveLocalBooks(values) {
    localStorage.setItem("books", JSON.stringify(values));
  }

  function getLocalBooks() {
    return JSON.parse(localStorage.getItem("books"));
  }

  return (
    <BooksContext.Provider
      value={{
        books: books,
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
        updateReadPageBook,
        addBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}
