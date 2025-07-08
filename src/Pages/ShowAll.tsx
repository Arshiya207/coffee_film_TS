// react router and react imports
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

// custom hooks imports
import useMultiGenreFetch from "../Hooks/useMultiGenreFetch";

// component imports
import Book from "../Components/Book";
import Badge from "../Components/Badge";
import Loading from "../HL Components/Loading";
import GridView from "../HL Components/GridView";

// type imports
import type { TBook, TShelf } from "../Types";
import type { JSX } from "react";


type ShowAllParamsType={
  genre:string,
  page:string
}


export default function ShowAll() {
  const params = useParams<ShowAllParamsType>();
  if(!params.genre || !params.page)
    throw new Error("params in showAll page are undefined")
  
  const [shelf, setShelf] = useState<TShelf>();
  const [fetchGenre, isLoading, updateFetch] = useMultiGenreFetch([
    { genre: params.genre, page: params.page },
  ]);
  useEffect(() => {
    async function getGenreMovies():Promise<void> {
        if(!params.genre || !params.page)
               throw new Error("params in showAll page are undefined")
      updateFetch([{ genre: params.genre, page: params.page }]);
      const result = await fetchGenre(1);
      if(!result)throw new Error("the result of genreFetch in show all page is undefined")
      setShelf(result[0]);
    }
    getGenreMovies();
  }, [params]);
  function renderMovies():JSX.Element[] | undefined{
    if (shelf) {
      const shelfBooks = shelf.books;

      return shelfBooks.map((book:TBook):JSX.Element => (
        <Book
          poster={book.poster}
          imdb_rating={book.imdb_rating}
          year={book.year}
          title={book.title}
          id={book.id}
          key={book.id}
        />
      ));
    }else return undefined
  }

  function renderPageLink() {
    if (shelf) {
      const pageLinkArr:JSX.Element[] = [];
      for (let i = 1; i <= shelf.shelfCount; i++) {
        pageLinkArr.push(
          <NavLink to={`/show-all/${shelf.shelfTitle}/${i}`} key={i}>
            <Badge>{i}</Badge>
          </NavLink>
        );
      }
      return pageLinkArr;
    }
  }

  return (
    <div className="show-all">
      <Loading type="large" isLoading={isLoading}>
        <GridView style={{flex:"1"}}   >{renderMovies()}</GridView>
        <div className="show-all__pages">{renderPageLink()}</div>
      </Loading>
    </div>
  );
}
