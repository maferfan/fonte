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
  postFavoriteByAccount: async (movieId: number, userId: number) => {
    try {
      const response = await api.post(
        `/user/favorite`,
        {
          movieId: movieId,
          id: userId,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  postWatchlistByAccount: async (movieId: number, userId: number) => {
    try {
      const response = await api.post(
        `/user/favorite`,
        {
          movieId: movieId,
          userId: userId,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getFavoriteByAccount: async (userId: number, page: number) => {
    try {
      const response = await api.get(
        `/user/${userId}/favorite?page=${page}`
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
