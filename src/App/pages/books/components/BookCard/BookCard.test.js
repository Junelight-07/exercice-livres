import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import BookCard from "./BookCard";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";

let mockPagesLues = "0";
let mockPagesTotales = "80";
let mockFavoriteBooks = [];
const mockAddFavorite = jest.fn();
const mockRemoveFavorite = jest.fn();
const mockUpdateReadPageBook = jest.fn();
jest.mock("../../../../../context/BooksContext", () => ({
  useBooksContext: jest.fn(() => ({
    favoriteBooks: mockFavoriteBooks,
    addFavorite: mockAddFavorite,
    removeFavorite: mockRemoveFavorite,
    updateReadPageBook: mockUpdateReadPageBook,
  })),
}));

describe("BookCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPagesLues = "0";
    mockPagesTotales = "80";
  });

  it("should not update read page book when max book pages are readed", () => {
    // Given
    render(
      <BookCard pagesLues={mockPagesLues} pagesTotales={mockPagesTotales} />,
      { wrapper: BrowserRouter }
    );

    // When
    const readPageInput = screen.getByTestId("readPagesInput");
    fireEvent.change(readPageInput, {
      target: { value: 81 },
    });

    // Then
    expect(mockUpdateReadPageBook).toHaveBeenCalledTimes(0);
    expect(readPageInput).toHaveAttribute("max", "80");
  });

  it("should update read page book when value is less than max book pages", () => {
    // Given
    render(
      <BookCard pagesLues={mockPagesLues} pagesTotales={mockPagesTotales} />,
      { wrapper: BrowserRouter }
    );

    // When
    const readPageInput = screen.getByTestId("readPagesInput");
    fireEvent.change(readPageInput, {
      target: { value: 40 },
    });

    // Then
    expect(mockUpdateReadPageBook).toHaveBeenCalledTimes(1);
  });

  it("should add in favorite when click on addFavorite button", () => {
    //Given
    render(
      <BookCard pagesLues={mockPagesLues} pagesTotales={mockPagesTotales} />,
      { wrapper: BrowserRouter }
    );

    //When
    const favoriteButton = screen.getByTestId("favorite");
    fireEvent.click(favoriteButton);

    // Then
    expect(mockAddFavorite).toHaveBeenCalledTimes(1);
  });

  it("shouldn't add in favorite when click on addFavorite button", () => {
    //Given
    mockFavoriteBooks = ["test-book"];
    render(
      <BookCard
        favoriteBooks={["test-book"]}
        name="test-book"
        pagesLues={mockPagesLues}
        pagesTotales={mockPagesTotales}
      />,
      { wrapper: BrowserRouter }
    );

    //When
    const favoriteButton = screen.getByTestId("favorite");
    fireEvent.click(favoriteButton);

    // Then
    expect(mockAddFavorite).toHaveBeenCalledTimes(0);
    expect(mockRemoveFavorite).toHaveBeenCalledTimes(1);
  });
});
