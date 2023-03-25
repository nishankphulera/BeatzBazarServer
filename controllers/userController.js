const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const createUser = async (req, res) => {
  const { name, email, phone, occupation, username, password } = req.body;

  console.log(req);

  try {
    const user = await User.create({
      name,
      email,
      phone,
      occupation,
      username,
      password,
    });
    res.status(200).json(user);
  } catch (error) {
    res.json({ error: error.message });
  }
};
const getUser = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign(
        { username: username, password: password },
        "123456"
      );
      return res.json(token);
    }
    return res.status(401).json({ message: "Incorrect username or password" });
  } catch (error) {
    console.error("Error: " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getUserByID = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.json({ error: "no such user" });
  }
  try {
    const user = await User.findById(id);

    res.status(200);
    if (!user) {
      res.status(404).json({ error: "no such user" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.json({ error: "no such user" });
  }
  try {
    const user = await User.findOneAndDelete({ _id: id });

    res.status(200).json(user);
    if (!user) {
      res.status(404).json({ error: "no such user" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.json({ error: "no such user" });
  }
  try {
    const user = await User.findOneAndUpdate({ _id: id }, { ...req.body });

    res.status(200).json(user);
    if (!user) {
      res.status(404).json({ error: "no such user" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUser,
  getUserByID,
  deleteUser,
  updateUser,
};
