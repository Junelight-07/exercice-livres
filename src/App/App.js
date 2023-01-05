import styles from "./App.module.scss";
import Books from "./pages/books/index";
import Book from "./pages/book/index";
import logo from "../assets/livresLogo.jpg";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Home />} />
        <Route path="/books/:name" element={<Book />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <div className={styles["page"]}>
      <div className={styles["pageTitle"]}>
        <h1>Le livre de livres</h1>
        <img src={logo} alt="logo de livres" />
      </div>
      <div className={styles["content"]}>
        <Books />
      </div>
    </div>
  );
}
