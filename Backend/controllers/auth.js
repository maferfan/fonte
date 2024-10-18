const { Users } = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userData = await Users.findOne({
      where: { email: email, name: name },
    });
    if (userData) {
      return res.status(400).send("User already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await Users.create({
      name,
      email,
      password: passwordHash,
    });
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
  }
};

const userLogin = async (req, res) => {
  const { name, password } = req.body;
  try {
    const userData = await Users.findOne({
      where: { name: name },
    });
    if (!userData) {
      return res.status(400).json("User not exists");
    }

    const isPasswordExists = await bcrypt.compare(password, userData.password);
    if (!isPasswordExists) {
      return res.status(400).json("Invalid password");
    }
    const token = jwt.sign({ id: userData.id }, process.env.SECRET, {
      expiresIn: 86400,
    });
    return res.status(201).json({ auth: true, token: token});
  } catch (error) {
    console.log(error);
  }
};

const getUserData = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { id: req.userId },
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).send({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).send("There was a problem finding the user.");
  }
};

const logout = async (req, res) => {
  res.status(200).json({ auth: false, token: null });
};
module.exports = { userRegister, userLogin, getUserData, logout};
