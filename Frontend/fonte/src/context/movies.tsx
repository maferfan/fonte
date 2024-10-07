import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import {
  IFavoritesAccount,
  IMovies,
  IMoviesVideos,
  IWatchlistAccount,
} from "../interfaces/movies";
import { IGenre } from "../interfaces/genre";
import { genreService } from "../service/genre.services";
import { useAuth } from "./auth";
import { IAccount } from "../interfaces/account";
interface IMovieContext {
  movies: IMovies;
  setMovies: React.Dispatch<React.SetStateAction<IMovies>>;
  genreId: number;
  setGenreId: React.Dispatch<React.SetStateAction<number>>;
  genre: IGenre[];
  setGenre: React.Dispatch<React.SetStateAction<IGenre[]>>;
  pageMovies: number;
  setPageMovies: React.Dispatch<React.SetStateAction<number>>;
  moviesVideos: IMoviesVideos;
  setMoviesVideos: React.Dispatch<React.SetStateAction<IMoviesVideos>>;
  handleWatchlist: (data: IWatchlistAccount) => Promise<void>;
  handleVideos: (movie_id: number) => Promise<void>;
  handleFavorites: (data: IFavoritesAccount) => Promise<void>;
  handleLogout: () => void;
  handleFavoritesSearch: () => Promise<void>;
  handleWatchlistSearch: () => Promise<void>;
  handleRegister: () => void;
}

const MovieContext = createContext<IMovieContext | undefined>(undefined);

interface MovieProviderProps {
  children: ReactNode;
}

export const MovieProvider = ({ children }: MovieProviderProps) => {
  const [genre, setGenre] = useState<IGenre[]>([]);
  const [movies, setMovies] = useState<IMovies>({} as IMovies);
  const [genreId, setGenreId] = useState<number>(0);
  const [pageMovies, setPageMovies] = useState<number>(1);
  const [moviesVideos, setMoviesVideos] = useState<IMoviesVideos>(
    {} as IMoviesVideos
  );
  const { account, sessionId } = useAuth();
  const handleVideos = async (movie_id: number) => {
    try {
      const response = await genreService.getMoviesVideos(movie_id);
      setMoviesVideos(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFavorites = async (data: IFavoritesAccount) => {
    try {
      const response = await genreService.postFavoriteByAccount(
        account.id,
        sessionId as string,
        data
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleWatchlist = async (data: IWatchlistAccount) => {
    try {
      const response = await genreService.postWatchlistByAccount(
        account.id,
        sessionId as string,
        data
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavoritesSearch = async () => {
    try {
      if (account && sessionId) {
        const response = await genreService.getFavoriteByAccount(
          account.id,
          sessionId as string 
        );
        setMovies(response);
        setGenreId(-1)
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleWatchlistSearch = async () => {
    try {
      if (account && sessionId) {
        const response = await genreService.getWatchlistByAccount(
          account.id,
          sessionId as string
        );
        setMovies(response); 
        setGenreId(-1)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = () => {
    window.location.href = "https://www.themoviedb.org/signup";
  };
  const handleLogout = () => {
    localStorage.removeItem("request_token");
    localStorage.removeItem("session_id");
    window.location.reload();
  };
  useEffect(() => {
    const fetchData = async () => {
      if (genreId === 0) {
        const moviesPopular = await genreService.getPopularMovies(pageMovies);
        setMovies(moviesPopular);
      } else if (genreId > 0 ) {
        const moviesByGenre = await genreService.getMoviesByGenre(genreId);
        setMovies(moviesByGenre);
      }
    };
    fetchData();
  }, [pageMovies, genreId, setMovies]);

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        genreId,
        setGenreId,
        pageMovies,
        setPageMovies,
        genre,
        setGenre,
        moviesVideos,
        setMoviesVideos,
        handleWatchlist,
        handleFavorites,
        handleVideos,
        handleFavoritesSearch,
        handleLogout,
        handleRegister,
        handleWatchlistSearch,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovies deve ser usado dentro de um MovieProvider");
  }
  return context;
};
