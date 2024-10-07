import { useState } from "react";
import { genreService } from "../../service/genre.services";
import "./Popular.css";
import {
  IFavoritesAccount,
  IMoviesVideos,
  IWatchlistAccount,
} from "../../interfaces/movies";
import Paginator from "../Paginator/Paginator";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../ui/Dialog";
import ReactPlayer from "react-player";
import { useMovies } from "../../context/movies";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
export const Popular = () => {
  const {
    movies,
    pageMovies,
    setPageMovies,
    handleFavorites,
    handleVideos,
    handleWatchlist,
    moviesVideos,
  } = useMovies();

  const { account } = useAuth();

  return (
    <div className="genre-container">
      <div className="grid sm:grid-cols-2  md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.results &&
          movies.results.map((row, rowIndex) => {
            return (
              <div key={row.id} className="flex ">
                <div>
                  <Modal>
                    <ModalTrigger>
                      <Link to={`/movie/${row.id}`}>
                        <img
                          src={`https://image.tmdb.org/t/p/w300${row.poster_path}`}
                          alt={row.title}
                          className="rounded-2xl cursor-pointer px-2 hover:scale-75 transition-transform duration-300 ease-in-out"
                          key={row.id}
                          onClick={() => handleVideos(row.id)}
                        />
                      </Link>
                    </ModalTrigger>
                    <ModalBody>
                      <ModalContent className="w-full flex justify-center items-center">
                        {moviesVideos.key && (
                          <div className="p-5 flex justify-center items-center round">
                            <ReactPlayer
                              url={`https://www.youtube.com/embed/${moviesVideos?.key}`}
                              playing
                              volume={0.1}
                            />
                          </div>
                        )}
                        <div className="p-6 flex justify-center items-center">
                          <i className="text-4xl font-bold text-red-700">
                            {row.title}
                          </i>
                        </div>
                        <div className="p-6 flex justify-center items-center text-justify">
                          <i>{row.overview}</i>
                        </div>
                      </ModalContent>
                      {account.id && (
                        <ModalFooter className="gap-4">
                          <>
                            <button
                              className="bg-green-600 text-white  dark:text-black text-sm px-3 py-1 rounded-md border border-black w-28"
                              onClick={() =>
                                handleFavorites({
                                  favorite: true,
                                  media_id: row.id,
                                  media_type: "movie",
                                })
                              }
                            >
                              Add on favorites
                            </button>
                            <button
                              className="bg-yellow-600 text-white  dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28"
                              onClick={() =>
                                handleWatchlist({
                                  watchlist: true,
                                  media_id: row.id,
                                  media_type: "movie",
                                })
                              }
                            >
                              Watched
                            </button>{" "}
                          </>
                        </ModalFooter>
                      )}
                    </ModalBody>
                  </Modal>
                </div>
              </div>
            );
          })}
      </div>
      <div>
        {movies.total_pages > 1 && (
          <Paginator
            currentPage={pageMovies}
            totalPages={movies.total_pages > 500 ? 500 : movies.total_pages}
            onPageChange={setPageMovies}
          />
        )}
      </div>
    </div>
  );
};
