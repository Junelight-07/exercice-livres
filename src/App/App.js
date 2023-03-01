import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import styles from "./App.module.scss";
import Header from "./pages/Header/Header";
import Books from "./pages/Books/index";
import Footer from "./pages/Footer/Footer";
import Book from "./pages/Book/index";
import Favorites from "./pages/Books/components/Favorites/Favorites";
import BooksContextProvider from "../context/BooksContext";
import Context from "../test/Context";
import FormNewBook from "./pages/Footer/components/FormNewBook";

export default function App() {
  return (
    <BooksContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Home />} />
          <Route path="/books/:name" element={<Book />} />
          <Route path="/books/favorites" element={<Favorites />} />
          <Route path="/test" element={<Context />} />
          <Route path="/newbook" element={<FormNewBook />} />
          <Route path="/newbook/" element={<FormNewBook />} />
        </Routes>
      </BrowserRouter>
    </BooksContextProvider>
  );
}

function Home() {
  return (
    <div className={styles["page"]}>
      <Header />
      <Books />
      <Footer />
    </div>
  );
}
