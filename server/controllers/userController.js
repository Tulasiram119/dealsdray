const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Both username and password are required" });
  }
  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(409).json({ error: "Username already exists." });
    }
    const newUser = new User({ username, password });
    await newUser.save();
    const payLoad = {
      username,
      id: newUser._id,
    };

    const token = jwt.sign(payLoad, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });
    res.status(201).json({ username, token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "internal server error , unable to register" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Both username and password are required" });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid creditionals" });
    }
    const payLoad = {
      username,
      id: user._id,
    };

    const token = jwt.sign(payLoad, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });
    res.status(200).json({ username, token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "internal server error , unable to login" });
  }
};

module.exports = { register, login };
