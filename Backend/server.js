const express = require("express");
const dotenv = require("dotenv");
const { connection } = require("./instance/database");
const cors = require('cors');
const moviesAPI = require("./views/movies")
const authAPI = require("./views/auth")
const userAPI = require("./views/user")
const app = express();

//Conexão
dotenv.config();
connection();
app.use(cors());

//Requisição POST/PUT
app.use(express.json());

//API
app.use(moviesAPI)
app.use(authAPI)
app.use(userAPI)

app.listen(process.env.PORT, () => {
  console.log("Servidor rodando em porta 8081.");
});
