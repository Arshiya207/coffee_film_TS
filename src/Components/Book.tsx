// type imports
import type { JSX } from "react";
import type { TBook } from "../Types";

// react router imports
import { Link } from "react-router-dom";

export default function Book({
  poster,
  imdb_rating,
  year,
  title,
  id,
}: TBook): JSX.Element {
  return (
    <div className="shelf-list__book">
      <Link to={`/m/${id}`}>
        <div className="book__header">
          <img src={poster} alt="movie poster" className="book-header__image" />
          <div className="book-header__detail">
            <p className="yellow-detail">{imdb_rating}</p>
            <p className="blue-detail">{year}</p>
          </div>
        </div>
        <div className="book__footer">
          <div className="book-footer__detail">
            <p>{title}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
