// package imports
import { nanoid } from "nanoid";

//type imports
import type { TBook, TGenre,TShelf,ApiGenreMoviesType,ApiGenreType,ApiUserType } from "./Types";


/**
 * @param paramsArr list of genres objects ex: [{genre:"drama",page:1}] 
 * @returns if ok it returns an array of shelves. ex: [
 * {
   id: string;
   shelfTitle: string;
   shelfCount: number;
   books: TBook[];
 }
 * ] if not ok it returns undefined
 */
export async function getMovieBasedOnGenre(
  paramsArr: TGenre[]
): Promise<TShelf[] | undefined> {
  try {
    const responses: Response[] = await Promise.all(
      paramsArr.map((param) =>
        fetch(
          `https://moviesapi.codingfront.dev/api/v1/genres/${param.genre}/movies?page=${param.page}`
        )
      )
    );
    const responsesAreOk: boolean = responses.every(
      (response: Response) => response.ok
    );
    if (!responsesAreOk) {
      throw new Error("couldn't fetch a shelf/shelves of movies from api");
    }
    const results: ApiGenreMoviesType[] = await Promise.all(
      responses.map(
        (response: Response): Promise<ApiGenreMoviesType> => response.json()
      )
    );
    const mapToShelvesArr: TShelf[] = results
      .map(
        (res: ApiGenreMoviesType, index: number): TShelf => ({
          books: res.data,
          id: nanoid(),
          shelfTitle: paramsArr[index].genre,
          shelfCount: res.metadata.page_count,
        })
      )
      .filter((shelf) => shelf.books.length > 0);

    return mapToShelvesArr;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.error("Unknown error", e);
    }
    return undefined;
  }
}


/**
 * 
 * @returns if ok it returns list of genres, ex: [{id: number;
  name: string;
  movies_count: number;}] if not okay it returns undefind
 */
export async function getGenres(): Promise<ApiGenreType[] | undefined> {
  try {
    const response: Response = await fetch(
      `https://moviesapi.codingfront.dev/api/v1/genres`
    );
    if (!response.ok) {
      throw new Error("couldn't fetch list of genres from API");
    }
    const result: ApiGenreType[] = await response.json();

    return result;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.log("unknown error", e);
    }
    return undefined;
  }
}


/**
 *
 * @param param0 is name of the movie in string type
 * @param param1 is page of result
 * @returns if ok it returns array of books if not ok it returns undefind
 */
export async function getMovieBasedOnName([name, page]: [
  string | FormDataEntryValue,
  number
]): Promise<TBook[] | undefined> {
  try {
    const response: Response = await fetch(
      `https://moviesapi.codingfront.dev/api/v1/movies?q=${name}&page=${page}`
    );
    if (!response.ok) {
      throw new Error("couldn't fetch the requested movie");
    }
    const result: { data: TBook[] } = await response.json();
    return result.data;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.log("unknown error", e);
    }
    return undefined;
  }
}


/**
 * 
 * @param id id of the move which is string
 * @returns it return a book object if ok, ex:{
  poster: string;
  imdb_rating: string;
  year: string;
  title: string;
  id: number;
} if not ok it returns undefind
 */
export async function getMovieBasedOnId(
  id: string
): Promise<TBook  | undefined > {
  try {
    const response: Response = await fetch(
      `https://moviesapi.codingfront.dev/api/v1/movies/${id}`
    );
    if (!response.ok) {
      throw new Error("there was a problem fetching the movie");
    }
    const result: TBook = await response.json();

    return result;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.log("unknown error", e);
    }
    return undefined;
  }
}

export async function getUser(id: string):Promise<ApiUserType|undefined> {
  try {
    const response: Response = await fetch(
      `http://localhost:5222/api/User/${id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("can fetch user from database");
    }

    const result:ApiUserType = await response.json();

    return result;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.log("unknown error", e);
    }
    return undefined;
  }
}
