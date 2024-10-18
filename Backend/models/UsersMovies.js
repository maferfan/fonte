const { DataTypes } = require("sequelize");
const { sequelize } = require("../instance/database");

const UserMovies = sequelize.define('UserMovie', {
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  adult: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  backdrop_path: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  genre_ids: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
  },
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: false,  
  },
  original_language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  original_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  overview: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  popularity: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  poster_path: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  release_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  video: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  vote_average: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  vote_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'UserMovies',
});

module.exports = { UserMovies };
