const axios = require("axios");
const { Users } = require("../models/Users");
const { UserMovies } = require("../models/UsersMovies");

const moviesGenre = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list",
      {
        params: {
          api_key: process.env.API_KEY,
        },
      }
    );
    res.json(response.data.genres);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao obter os filmes" });
  }
};
const moviesByGenre = async (req, res) => {
  try {
    const { genre_id } = req.params;
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${genre_id}`,
      {
        params: {
          api_key: process.env.API_KEY,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao obter os filmes" });
  }
};
const moviesPopular = async (req, res) => {
  const page = req.query.page || 1;
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular",
      {
        params: {
          api_key: process.env.API_KEY,
          page: page,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao obter os filmes" });
  }
};

const moviesByLetter = async (req, res) => {
  const letter = req.query.letter;
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular",
      {
        params: {
          api_key: process.env.API_KEY,
          query: letter,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao obter os filmes" });
  }
};

const moviesVideos = async (req, res) => {
  const { movie_id } = req.params;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movie_id}/videos`,
      {
        params: {
          api_key: process.env.API_KEY,
        },
      }
    );
    res.json(response.data.results[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao obter os filmes" });
  }
};

const favoriteMovieByAccount = async (req, res) => {
  const { movieId, id } = req.body;
  try {
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      {
        params: {
          api_key: process.env.API_KEY,
        },
      }
    );

    const movieData = response.data;
    const existingFavorite = await UserMovies.findOne({
      where: {
        UserId: user.id,
        id: movieData.id,
      },
    });

    if (existingFavorite) {
      return res
        .status(400)
        .json({ error: "Este filme já está favoritado por você." });
    }

    const favoriteByAccount = await UserMovies.create({
      UserId: user.id,
      adult: movieData.adult,
      backdrop_path: movieData.backdrop_path,
      genre_ids: movieData.genres.map((genre) => genre.id),
      id: movieData.id,
      original_language: movieData.original_language,
      original_title: movieData.original_title,
      overview: movieData.overview,
      popularity: movieData.popularity,
      poster_path: movieData.poster_path,
      release_date: movieData.release_date,
      title: movieData.title,
      video: movieData.video,
      vote_average: movieData.vote_average,
      vote_count: movieData.vote_count,
    });

    res.json({ message: "Filme favoritado com sucesso", favoriteByAccount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao favoritar o filme" });
  }
};

const getfavoriteMovieByAccount = async (req, res) => {
  const { id } = req.params;
  const { page = 1, limit = 20 } = req.query;
  const offset = (page - 1) * limit;
  try {
    const userFavorites = await UserMovies.findAll({
      where: { UserId: id },
      attributes: { exclude: ["UserId"] },
      limit: parseInt(limit),
      offset: offset,
    });
    const totalItems = await UserMovies.count({ where: { UserId: id } });
    const totalPages = Math.ceil(totalItems / limit);

    const JSON = {
      page: parseInt(page),
      results: userFavorites,
      total_results: userFavorites.length,
      total_pages: totalPages,
    };
    res.status(200).json(JSON);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  moviesGenre,
  moviesPopular,
  moviesByLetter,
  moviesVideos,
  moviesByGenre,
  favoriteMovieByAccount,
  getfavoriteMovieByAccount,
};
