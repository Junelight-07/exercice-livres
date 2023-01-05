import { useParams } from "react-router-dom";
import { bookList } from "../../../data/bookList";

export default function Book() {
  const { name } = useParams();
  const book = bookList.find((b) => b?.name === name);

  if (!book) return "book does not exist";
  return <div>{book.label}</div>;
}
