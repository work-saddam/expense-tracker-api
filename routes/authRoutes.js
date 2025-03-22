const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

function validateUser(userName, passsword) {
  if (!userName || !passsword) {
    return false;
  } else {
    if (passsword.length < 6) {
      return false;
    }
  }
  return true;
}

router.post("/signup", async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!validateUser(userName, password)) {
      return res.send("User not valid");
    }

    const existingUser = await User.findOne({ userName: userName });
    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    const user = new User({ userName, password });
    await user.save({});
    res.status(201).json({ message: "User signed up" });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userName = req.body.userName;
    const user = await User.findOne({ userName: userName });
    if (!user) {
      return res.status(400).json({ error: "user not found" });
    }

    // Authenticate user
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Authorisation
    const token = jwt.sign(
      { userName: user.userName, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({ token });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
