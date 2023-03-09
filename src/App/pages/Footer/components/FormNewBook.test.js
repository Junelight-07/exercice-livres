import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import FormNewBook from "./FormNewBook";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";

const mockBooks = [];
const mockAddBook = jest.fn();
jest.mock("../../../../context/BooksContext", () => ({
  useBooksContext: () => ({
    books: mockBooks,
    addBook: mockAddBook,
  }),
}));

test("submitting a new book", async () => {
  render(<FormNewBook />, {
    wrapper: BrowserRouter,
  });

  const bookName = screen.getByTestId("bookName");
  const bookLabel = screen.getByTestId("bookLabel");
  const bookCategory = screen.getByTestId("bookCategory");
  const bookTotalPages = screen.getByTestId("bookTotalPages");
  const bookSummary = screen.getByTestId("bookSummary");
  const form = screen.getByTestId("form");
  const linkElement = screen.getByTestId("bookReturnHome");

  // fill the form
  fireEvent.change(bookName, {
    target: { value: "le-livre-sur-la-jungle" },
  });
  expect(bookName.value).toBe("le-livre-sur-la-jungle");

  fireEvent.change(bookLabel, {
    target: { value: "Le livre sur la Jungle" },
  });
  expect(bookLabel.value).toBe("Le livre sur la Jungle");

  fireEvent.change(bookCategory, {
    target: { value: "MGM" },
  });
  expect(bookCategory.value).toBe("MGM");

  fireEvent.change(bookTotalPages, {
    target: { value: "350" },
  });
  expect(bookTotalPages.value).toBe("350");

  fireEvent.change(bookSummary, {
    target: { value: "Un livre sur la jungle" },
  });
  expect(bookSummary.value).toBe("Un livre sur la jungle");

  // and submit it
  await fireEvent.submit(form);

  // mockAddBook have been called once
  expect(mockAddBook).toHaveBeenCalledTimes(1);

  //  with the good datas
  expect(mockAddBook).toHaveBeenCalledWith({
    id: "okokok",
    name: "le-livre-sur-la-jungle",
    label: "Le livre sur la Jungle",
    category: "MGM",
    pagesTotales: "350",
    pagesLues: "0",
    favorite: false,
    summary: "Un livre sur la jungle",
  });

  const bookSuccessMessage = screen.getByTestId("bookSuccessMessage");
  expect(bookSuccessMessage).toBeInTheDocument();

  // the home button is present
  expect(linkElement).toBeInTheDocument();
});
