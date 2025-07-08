// component imports
import GridView from "../HL Components/GridView";
import Book from "../Components/Book";
import Loading from "../HL Components/Loading";

// api imports
import { getUser, getMovieBasedOnId } from "../api";

// react imports
import { useEffect, useState } from "react";

//type imports
import type { TFavorite, ApiUserType, TBook } from "../Types";
import type { JSX } from "react";


export default function Favorites() {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<TBook[]>([]);
  const coffeeFilmUserId: string | null =
    localStorage.getItem("coffeeFilmUserId");
  useEffect(() => {
    let timeoutId: number;
    async function getUserInfo(): Promise<void> {
      if (!coffeeFilmUserId) return;
      setIsloading(true);
      const result: ApiUserType | undefined = await getUser(coffeeFilmUserId);
      if (!result)
        throw new Error("result of get user from favorite page is undefined");

      const favorites: TFavorite[] = result.favorites;
      const favoriteMoviesResult: (TBook | undefined)[] = await Promise.all(
        favorites.map(
          (fav: TFavorite): Promise<TBook | undefined> =>
            getMovieBasedOnId(fav.favMovieId)
        )
      );

      setFavorites(
        favoriteMoviesResult.filter(
          (book: TBook | undefined): book is TBook => !!book
        )
      );

      timeoutId = setTimeout(() => {
        setIsloading(false);
      }, 500);
    }
    getUserInfo();
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  function renderEle(): JSX.Element[] {
    return favorites.map((book) => (
      <Book
        key={book.id}
        poster={book.poster}
        imdb_rating={book.imdb_rating}
        title={book.title}
        year={book.year}
        id={book.id}
      />
    ));
  }

  return (
    <Loading isLoading={isLoading} type="large">
      <GridView
        title={true}
        titleText="favorites"
        style={{ justifyItems: "flex-start" }}
      >
        {renderEle()}
      </GridView>
    </Loading>
  );
}
