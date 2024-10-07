import { IFavoritesAccount, IWatchlistAccount } from "../interfaces/movies";
import { api } from "./baseUrl.services";

export const genreService = {
  getGenre: async () => {
    try {
      const response = await api.get("/movies/genre");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getPopularMovies: async (page: number | 1) => {
    try {
      const response = await api.get(`/movies/popular?page=${page}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getMoviesVideos: async (movie_id: number) => {
    try {
      const response = await api.get(`/movies/videos/${movie_id}}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getMoviesByGenre: async (genre_id: number) => {
    try {
      const response = await api.get(`/movies/genre/${genre_id}}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  postFavoriteByAccount: async (
    account_id: number,
    session_id: string,
    params: IFavoritesAccount
  ) => {
    try {
      const response = await api.post(
        `/account/favorite/${account_id}/${session_id}`,
        params
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  postWatchlistByAccount: async (
    account_id: number,
    session_id: string,
    params: IWatchlistAccount
  ) => {
    try {
      const response = await api.post(
        `/account/watchlist/${account_id}/${session_id}`,
        params
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getFavoriteByAccount: async (account_id: number, session_id: string) => {
    try {
      const response = await api.get(
        `/account/favorite/${account_id}/${session_id}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getWatchlistByAccount: async (account_id: number, session_id: string) => {
    try {
      const response = await api.get(
        `/account/watchlist/${account_id}/${session_id}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
