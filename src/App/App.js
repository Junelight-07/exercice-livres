import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import styles from "./App.module.scss";
import Books from "./pages/Books/index";
import Book from "./pages/Book/index";
import Favorites from "./pages/Books/components/Favorites/Favorites";
import logo from "../assets/livresLogo.jpg";
import BooksContextProvider from "../context/BooksContext";

export default function App() {
  return (
    <BooksContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Home />} />
          <Route path="/books/:name" element={<Book />} />
          <Route path="/books/favorites" element={<Favorites />} />
        </Routes>
      </BrowserRouter>
    </BooksContextProvider>
  );
}

function Home() {
  return (
    <div className={styles["page"]}>
      <div className={styles["pageTitle"]}>
        <h1>Le livre de livres</h1>
        <img src={logo} alt="logo de livres" />
      </div>
      <Books />
    </div>
  );
}
