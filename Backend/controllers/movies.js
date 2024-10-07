const axios = require("axios");

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



module.exports = {
  moviesGenre,
  moviesPopular,
  moviesByLetter,
  moviesVideos,
  moviesByGenre,
};
