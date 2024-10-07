const {
  moviesGenre,
  moviesPopular,
  moviesByLetter,
  moviesVideos,
  moviesByGenre,
} = require("../controllers/movies");
const {
} = require("../controllers/auth");
const express = require("express");
const router = express.Router();

router.get("/movies/genre", moviesGenre);
router.get("/movies/popular", moviesPopular);
router.get("/movies/search", moviesByLetter);
router.get("/movies/videos/:movie_id", moviesVideos);
router.get("/movies/genre/:genre_id", moviesByGenre);
 

module.exports = router;
