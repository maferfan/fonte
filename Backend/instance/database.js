const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.MS_DATABASE,
  process.env.MS_USER,
  process.env.MS_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = {connection, sequelize}