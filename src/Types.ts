// my types
export type TGenre = {
  genre: string;
  page: number | string;
};

export type TBook = {
  poster: string;
  imdb_rating: string;
  year: string;
  title: string;
  id: number;
  plot?:string
  

};

export type TShelf = {
  id: string;
  shelfTitle: string;
  shelfCount: number;
  books: TBook[];
};

export type TWatchLater={
  watchLaterId:string,
  userId:number,
  wlMovieId:string
}
export type TFavorite={
  favoriteId:string,
  userId:number,
  favMovieId:string
}


// Api types
export type ApiUserType={
  id:number,
  userName:string,
  userEmail:string,
  userPassword:string,
  secKey:string,
  createdDate:string,
  favorites:TFavorite[]
  watchLaters:TWatchLater[]
}

export type ApiGenreMoviesType = {
  data: TBook[];
  metadata: {
    current_page: string;
    per_page: number;
    page_count: number;
    total_count: number;
  };
};

export type ApiGenreType = {
  id: number;
  name: string;
  movies_count: number;
};
