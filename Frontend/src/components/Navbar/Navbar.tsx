import "./Navbar.css";
import { Link } from "react-router-dom";
import { useMovies } from "../../context/movies";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { useAuth } from "../../context/auth";

export const Navbar = () => {
  const {
    handleFavoritesSearch,
    handleWatchlistSearch,
    handleRegister,
    handleLogout,
    setGenreId,
  } = useMovies();

  const { account, handleToken } = useAuth();
  return (
    <div className="navbar-container">
      <div className="nav-left">
        <Link className="nav-title" to={"/"} onClick={() => setGenreId(0)}>
          StarWatch
        </Link>
        {account.id && (
          <div className=" nav-span-container span-info">
            <Link onClick={() => handleFavoritesSearch()} to="/MyFavorites">
              Favorites
            </Link>
            <Link onClick={() => handleWatchlistSearch()} to="/MyWatchlist">
              Watched
            </Link>
          </div>
        )}
      </div>
      {!account.id && (
        <div className="flex gap-4">
          <button onClick={() => handleToken()}>Sign in</button>
          <button onClick={() => handleRegister()}>Sign up</button>
        </div>
      )}
      {account.id && (
        <div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={`Bem vindo, ${account.username}`} />
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
