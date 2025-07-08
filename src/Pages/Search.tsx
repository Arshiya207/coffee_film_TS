// component imports
import Book from "../Components/Book";
import Loading from "../HL Components/Loading";

// api imports'
import { getMovieBasedOnName } from "../api";

// react imports
import { useState } from "react";

// type imports
import type { TBook } from "../Types";
import type { JSX } from "react";


export default function Search():JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [books, setBooks] = useState<TBook[]>([]);
  function search(fromData:FormData):void {
    const requestedBookName:string|undefined=fromData.get("search")?.toString()
    
   
    
    
    async function getBooks():Promise<void> {
       if(!requestedBookName)return
      setIsLoading(true);
      const result:TBook[]|undefined = await getMovieBasedOnName([requestedBookName, 1]);
      if(!result){
        throw new Error("the result of getMovieBasedOnName is undefined")
      }
      setBooks(result);

      setIsLoading(false);
    }
    getBooks();
  }
  function renderBooks():JSX.Element[] | undefined {
    if (books.length > 0) {
      return books.map((book) => {
        return (
          <Book
            key={book.id}
            poster={book.poster}
            id={book.id}
            imdb_rating={book.imdb_rating}
            title={book.title}
            year={book.year}
          />
        );
      });
    }else return undefined
  }

  return (
    <div className="search">
      <form className="search__form" action={search}>
        <input
          type="text"
          name="search"
          className="search-form__input"
          placeholder="search your favorite movie"
          autoComplete="off"
        />
        <button className="search-form__submit">submit</button>
      </form>
      <div className="search__results">
        <Loading isLoading={isLoading} type="large">
          {renderBooks()}
        </Loading>
      </div>
    </div>
  );
}
