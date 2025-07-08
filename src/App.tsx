// react and packages imports
import { useState, useEffect,type JSX} from "react";
import { useInView } from "react-intersection-observer";

// component imports
import poster from "./assets/poster.png";
import Shelf from "./Components/Shelf";

// custom hooks imports
import useEffectOnUpdate from "./Hooks/useEffectOnUpdate";
import useMultiGenreFetch from "./Hooks/useMultiGenreFetch";

// HL component imports
import Loading from "./HL Components/Loading";

//api imports
import { getGenres } from "./api";

//type imports
import type { ApiGenreType, TGenre, TShelf } from "./Types";





export default function App():JSX.Element {
  const [movieGenres, setMovieGenres] = useState<TGenre[]>([]);
  const [shelves, setShelves] = useState<TShelf[]>([]);
  const [fetchShelves, isLoading, updateList] = useMultiGenreFetch(movieGenres);
  const { ref: lastShelf, inView } = useInView({ threshold: 1 });

  useEffectOnUpdate<boolean>(() => {
    if (inView && shelves.length > 0) {
      let remainingShelves:number = movieGenres.length - shelves.length;

      if (remainingShelves > 0 && remainingShelves <= 5) {
        fetchShelves(remainingShelves).then((shelves:TShelf[]|undefined):void =>{
            if(!shelves){
                console.error("fetch shelves function result is undefind there is either a problem in API or your are not connected to the network")
                return 
            }
          setShelves((prevShelves) => [...prevShelves, ...shelves])
        }
        );
      } else if (remainingShelves > 5) {
        fetchShelves(5).then((shelves:TShelf[]|undefined):void =>{
          
              if(!shelves){
                console.error("fetch shelves function result is undefind there is either a problem in API or your are not connected to the network")
                return 
            }
          setShelves((prevShelves) => [...prevShelves, ...shelves])
        }
        );
      }
    }
  }, [inView]);

  useEffect(() => {
    let isMounted:boolean = true;
    getGenres().then((result:ApiGenreType[]|undefined) => {
      if (isMounted) {
        if(!result){
            console.error("the getGenres function result is undefind")
            return
        }
        const genres:TGenre[] = result.map((genre:ApiGenreType):TGenre => ({
          genre: genre.name.toLowerCase(),
          page: 1,
        }));

        setMovieGenres(genres);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffectOnUpdate<TGenre[]>(() => {
    if (movieGenres.length > 0) {
      async function getShelves():Promise<void> {
        updateList(movieGenres);
        const shelves:TShelf[]|undefined = await fetchShelves(5);
        if(!shelves){
            console.error("fetch shelves function return undefined there is either a problem from api or your are not connect to the network")
            return
        }
        setShelves(shelves);
      }

      getShelves();
    }
  }, [movieGenres]);

  function renderShelves():JSX.Element[]|undefined {
    if (shelves.length > 0) {
      return shelves.map((shelf:TShelf, index:number):JSX.Element => {
        if (index == shelves.length - 1) {
          return (
            <Shelf Ref={lastShelf} key={shelf.id} books={shelf.books}>
              {shelf.shelfTitle}
            </Shelf>
          );
        } else {
          return (
            <Shelf Ref={()=>null} key={shelf.id} books={shelf.books}>
              {shelf.shelfTitle}
            </Shelf>
          );
        }
      });
    }else return undefined
  }

  return (
    <>
      <div className="main-header__poster">
        <img src={poster} alt="poster" className="poster__poster" />
      </div>
      <main className="main">
        <Loading isLoading={isLoading}>{renderShelves()}</Loading>
      </main>
    </>
  );
}
