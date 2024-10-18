import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import {
  IMovies,
  IMoviesVideos,
} from "../interfaces/movies";
import { IGenre } from "../interfaces/genre";
import { genreService } from "../service/genre.services";
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
  handleVideos: (movie_id: number) => Promise<void>;
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
  
  const handleVideos = async (movie_id: number) => {
    try {
      const response = await genreService.getMoviesVideos(movie_id);
      setMoviesVideos(response);
    } catch (error) {
      console.log(error);
    }
  };

  

  useEffect(() => {
    const fetchData = async () => {
      if (genreId === 0) {
        const moviesPopular = await genreService.getPopularMovies(pageMovies);
        setMovies(moviesPopular);
      } else if (genreId > 0) {
        const moviesByGenre = await genreService.getMoviesByGenre(genreId);
        setMovies(moviesByGenre);
      }
    };
    fetchData();
  }, [pageMovies, genreId, setMovies]);

  useEffect(() => {
    setPageMovies(1);
  }, [genreId]);

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
        handleVideos,
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
