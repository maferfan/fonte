export interface IMovies {
    page: number
    results: IMoviesResult[]
    total_pages: number
    total_results: number
  }
  
  export interface IMoviesResult {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
  }
  
  export interface IMoviesVideos {
    iso_639_1: string
    iso_3166_1: string
    name: string
    key: string
    site: string
    size: number
    type: string
    official: boolean
    published_at: string
    id: string
  }

  export interface IFavoritesAccount {
    media_type: string,
    media_id: number,
    favorite: boolean
  }

  export interface IWatchlistAccount {
    media_type: string,
    media_id: number,
    watchlist: boolean
  }