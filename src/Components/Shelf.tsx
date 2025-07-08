//react and package imports
import type { JSX, ReactNode } from "react";

// component imports
import Book from "./Book";

//react router imports
import { Link } from "react-router-dom";

// type imports
import type { TBook } from "../Types";

type ShelfPropsType = {
  children: ReactNode;
  books: TBook[];
  Ref: (node?: Element | null) => void;
};

export default function Shelf({
  children,
  books,
  Ref,
}: ShelfPropsType): JSX.Element {
  const booksEle = books.map((book) => (
    <Book
      key={book.id}
      poster={book.poster}
      imdb_rating={book.imdb_rating}
      title={book.title}
      year={book.year}
      id={book.id}
    />
  ));

  return (
    <div className="shelf" ref={Ref}>
      <div className="shelf__detail">
        <h2>{children}</h2>
        <Link to={`show-all/${children}/1`} className="link-hover">
          show all
        </Link>
      </div>
      <div className="shelf__list">{booksEle}</div>
    </div>
  );
}
