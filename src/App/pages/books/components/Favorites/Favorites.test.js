import { render, screen } from "@testing-library/react";
import Favorites from "./Favorites";

test("renders learn react link", () => {
  render(<Favorites />);
  const linkElement = screen.getByText(/Vos favoris/i);
  expect(linkElement).toBeInTheDocument();
});
