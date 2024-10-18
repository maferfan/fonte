import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useMovies } from "../../context/movies";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { useAuth } from "../../context/auth";
import { genreService } from "../../service/genre.services";
import { useEffect } from "react";

export const Navbar = () => {
  const nav = useNavigate();
  const { setGenreId, setMovies, pageMovies, genreId } = useMovies();
  const {  handleLogout, user } = useAuth();
  const handleFavoritesSearchById = async () => {
    try {
      if(user){
        const response = await genreService.getFavoriteByAccount(user.id as number, pageMovies);
        setMovies(response);
        setGenreId(-1)
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    if(genreId === -1)
    handleFavoritesSearchById();
  }, [pageMovies]);

  
  return (
    <div className="navbar-container">
      <div className="nav-left">
        <Link className="nav-title" to={"/"} onClick={() => setGenreId(0)}>
          StarWatch
        </Link>
        {user && (
          <div className=" nav-span-container span-info">
             <Link onClick={() => handleFavoritesSearchById()} to="/MyFavorites">
              Favorites
            </Link> 
            {/* <Link onClick={() => handleWatchlistSearch()} to="/MyWatchlist">
              Watched
            </Link> } */}
          </div>
        )}
      </div>
      {!user && (
        <div className="flex gap-4">
          <button onClick={() => nav("/Login")}>Login</button>
          <button onClick={() => nav("/Register")}>Register</button>
        </div>
      )}
      {user && (
        <div>
          <Select>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder={`Bem vindo, ${user?.name}!`} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <button
                  className="text-white flex h-10 w-full items-center justify-between rounded-md bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                  onClick={() => handleLogout()}
                >
                  Logout
                </button>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};
