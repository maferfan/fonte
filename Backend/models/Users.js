const {  DataTypes } = require("sequelize");
const { sequelize } = require("../instance/database");

const Users = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "users"
  }
);

sequelize.sync()
module.exports = { Users };
