// component imports
import GridView from "../HL Components/GridView";
import Book from "../Components/Book";
import Loading from "../HL Components/Loading";

// api imports
import { getUser } from "../api";
import { getMovieBasedOnId } from "../api";

// react imports
import { useEffect, useState } from "react";

// type imports
import type { ApiUserType, TBook, TWatchLater } from "../Types";
import type { JSX } from "react";


export default function WatchLater() {
   const [isLoading, setIsloading] = useState<boolean>(false);
    const [watchLaters, setWatchLaters] = useState<TBook[]>();
    const coffeeFilmUserId = localStorage.getItem("coffeeFilmUserId");

    useEffect(() => {
        let timeoutId:number;
        async function getUserInfo():Promise<void> {
          if(!coffeeFilmUserId)return
          setIsloading(true);
          const result:ApiUserType|undefined = await getUser(coffeeFilmUserId);
          if(!result)throw new Error("result of getUser in watchLater page is undefined")
          const watchLaters:TWatchLater[] = result.watchLaters;
          const watchLatersResults:(TBook|undefined)[] = await Promise.all(
            watchLaters.map((WL) => getMovieBasedOnId(WL.wlMovieId))
          );
          setWatchLaters(watchLatersResults.filter((book:TBook|undefined):book is TBook=> !!book));
    
          timeoutId = setTimeout(() => {
            setIsloading(false);
          }, 500);
        }
        getUserInfo();
        return () => {
          clearTimeout(timeoutId);
        };
      }, []);

  function renderEle():JSX.Element[]|undefined {
    if (watchLaters) {
      
     return watchLaters.map((watchLater) => (
        <Book
          key={watchLater.id}
          poster={watchLater.poster}
          imdb_rating={watchLater.imdb_rating}
          title={watchLater.title}
          year={watchLater.year}
          id={watchLater.id}
        />
      ));
    }else return undefined
  }
  return (
    <Loading isLoading={isLoading} type="large">
    <GridView title={true} titleText="watch later" style={{justifyItems:"flex-start"}} >
        {renderEle()}
    </GridView>

    </Loading>
  );
}
