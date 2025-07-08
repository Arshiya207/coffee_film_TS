// react and package imports
import {
  BsBookmarkPlus as WatchLater,
  BsBox2Heart as Favorite,
} from "react-icons/bs";

// type imports
import type { TBook } from "../Types";
import type { JSX } from "react";

export default function Frame({
  poster,
  imdb_rating,
  year,
  title,
  plot,
}: Omit<TBook, "id">): JSX.Element {
  return (
    <div className="movie__content">
      <div className="movie-content__frame">
        <img className="frame__image" src={poster} alt="poster" />
        <div className="frame__actions">
          <button className="frame__watch-later text-icon">
            <WatchLater />
            watchLater
          </button>
          <button className="farme__favorite text-icon">
            <Favorite />
            favorite
          </button>
        </div>
        <div className="frame__info ">
          <p className="blue-detail">{year}</p>
          <p className="yellow-detail">{imdb_rating}</p>
        </div>
      </div>
      <div className="movie-content__description">
        <h2 className="movie__title">{title}</h2>
        <p className="movie__plot">{plot}</p>
      </div>
    </div>
  );
}
