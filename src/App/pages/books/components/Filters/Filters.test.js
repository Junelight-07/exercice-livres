import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Filters from "./Filters";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

let mockFilters = { category: "", search: "" };
let mockCategories = ["Disney", "Metro-Goldwyn-Mayer", "Bayard"];
const mockOnCategory = jest.fn();
const mockOnSearch = jest.fn();
const mockOnResetFilters = jest.fn();
jest.mock("../../../../../context/BooksContext", () => ({
  useBooksContext: () => ({
    filters: mockFilters,
    categories: mockCategories,
    onCategory: mockOnCategory,
    onSearch: mockOnSearch,
    onResetFilters: mockOnResetFilters,
  }),
}));

test("filter books with select", async () => {
  render(<Filters />, {
    wrapper: BrowserRouter,
  });

  //select must be initialised with the text "Toutes les catégories"
  expect(screen.getByText(/Toutes les catégories/i)).toBeInTheDocument();

  //select is clicked
  userEvent.click(screen.getByTestId("select"));

  //select must render the different option
  expect(screen.getByText(/Disney/i)).toBeInTheDocument();
  expect(screen.getByText(/Metro-Goldwyn-Mayer/i)).toBeInTheDocument();
  expect(screen.getByText(/Bayard/i)).toBeInTheDocument();

  // click on the Disney option in the select
  await fireEvent.change(screen.getByTestId("select"), {
    target: { value: "Disney" },
  });

  // select must have written Disney on it
  expect(screen.getByText(/Disney/i)).toBeInTheDocument();

  // mockOnCategory must be called
  expect(mockOnCategory).toHaveBeenCalledTimes(1);
});

test("filter books with input", async () => {
  render(<Filters />, {
    wrapper: BrowserRouter,
  });

  const searchInput = screen.getByTestId("searchInput");

  // input search must have been initialised with an empty field
  expect(searchInput).toBeInTheDocument();
  expect(searchInput.value).toBe("");

  //launch a research on the searchInput
  fireEvent.change(searchInput, { target: { value: "tom" } });

  // mockOnSearch must be called
  expect(mockOnSearch).toHaveBeenCalledTimes(1);
});

test("filter books must be reinitialised", async () => {
  render(<Filters />, {
    wrapper: BrowserRouter,
  });

  //reinitialised filters
  fireEvent.click(screen.getByTestId("resetButton"));

  // mockOnSearch must be called
  expect(mockOnResetFilters).toHaveBeenCalledTimes(1);
});
