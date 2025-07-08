// react router and react imports
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// api imports
import { getMovieBasedOnId } from "../api";

// asset imports
import background from "../assets/movieBackground.png";

// component imports
import Frame from "../Components/Frame";
import Loading from "../HL Components/Loading";

// type imports
import type {JSX} from "react"
import type { TBook } from "../Types";

type MovieParamsType={
  id:string
}


export default function Movie():JSX.Element {
  const params = useParams<MovieParamsType>();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [movie, setMovie] = useState<TBook>();

  useEffect(() => {
    async function getMovie():Promise<void> {
      if(!params.id) return
      setIsloading(true);
      const result:TBook|undefined = await getMovieBasedOnId(params.id);
      if(!result){
        throw new Error("the result object from getMovieBasedOnId is undefind")
      }
      setMovie(result);
      setIsloading(false);
    }
    getMovie();
  }, []);
  function renderMovie():JSX.Element|undefined {
    if (movie) {
      return (
        <Frame
          key={movie.id}
          poster={movie.poster}
          year={movie.year}
          plot={movie.plot}
          imdb_rating={movie.imdb_rating}
          title={movie.title}
        />
      );
    }
  }
  return (
    <div className="movie">
      <Loading isLoading={isLoading} type="large">
        {renderMovie()}
      </Loading>
      <img src={background} alt="background" className="movie__background" />
    </div>
  );
}
