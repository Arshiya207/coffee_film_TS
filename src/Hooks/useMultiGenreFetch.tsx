//react imports
import { useState, useRef } from "react";

//api imports
import { getMovieBasedOnGenre } from "../api";

// type imports
import type { TShelf } from "../Types";
import type { TGenre } from "../Types";



export default function getMultiShelves(list: TGenre[] = []):[(number:number)=>Promise<TShelf[]|undefined>,boolean,(newValue:TGenre[])=>void] {
  const [isLoading, setIsLoading] = useState<boolean>(() => false);

  const callList = useRef<TGenre[]>(list);
  function updateList(newValue: TGenre[]):void {
    callList.current = newValue;
  }

  async function callFunction(number: number): Promise<TShelf[] | undefined> {
    setIsLoading(true);
    const arrayOfGenres: TGenre[] = callList.current.slice(0, number);
    updateList(callList.current.slice(number, callList.current.length));
    const results:TShelf[]|undefined = await getMovieBasedOnGenre(arrayOfGenres);
    
    if (!results) {
      setIsLoading(false);
      return undefined;
      
    } 

    setIsLoading(false);

    return results;
  }

  return [callFunction, isLoading, updateList];
}
