const {
  moviesGenre,
  moviesPopular,
  moviesByLetter,
  moviesVideos,
  moviesByGenre,
  favoriteMovieByAccount,
  getfavoriteMovieByAccount
} = require("../controllers/movies");
const {
} = require("../controllers/auth");
const express = require("express");
const router = express.Router();

// IMDB API
router.get("/movies/genre", moviesGenre);
router.get("/movies/popular", moviesPopular);
router.get("/movies/search", moviesByLetter);
router.get("/movies/videos/:movie_id", moviesVideos);
router.get("/movies/genre/:genre_id", moviesByGenre);

// Favorite movies
router.post("/user/favorite", favoriteMovieByAccount);
router.get("/user/:id/favorite", getfavoriteMovieByAccount);

module.exports = router;
