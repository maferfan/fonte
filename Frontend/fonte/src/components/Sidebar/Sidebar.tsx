import { useEffect } from "react";
import { genreService } from "../../service/genre.services";
import { useMovies } from "../../context/movies";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const { setGenreId, setGenre, genre } = useMovies();
  
  useEffect(() => {
    const fetchData = async () => {
      const genres = await genreService.getGenre();
      setGenre(genres);
    };
    fetchData()
  }, [setGenre]);
  
  return (
    <div>
      <div className="w-full shadow-2xl md:max-w-[12em] h-full flex flex-col gap-6 items-start  bg-[rgb(49,49,49)] shadow-gray-600 text-white ">
        <Link
          className="text-md p-3 text-start focus:bg-gray-500 focus:p-3 focus:rounded-md w-full"
          onClick={() => setGenreId(0)}
          to={`/`}
        >
          Popular
        </Link>
        {genre.map((genre) => (
          <Link
            className="text-md p-3 text-start focus:bg-gray-500 focus:p-3 focus:rounded-md w-full"
            key={genre.id}
            onClick={() => setGenreId(genre.id)}
            to={`/Category/${genre.id}`}
          >
            {genre.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
