const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const validator = require("validator");

function validateSignUpData(firstName, lastName, email, password) {
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter strong password");
  }
}

exports.signupUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    validateSignUpData(firstName, lastName, email, password);

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already register" });
    }

    const user = new User({ firstName, lastName, email, password });
    await user.save({});
    res.status(201).json({ message: "User signed up" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json("email and password are required");
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ error: "user not found" });
    }

    // Authenticate user
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Authorisation
    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({ token });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName },
      { new: true }
    );

    if (!updateUser) {
      return res.status(400).json("User not found");
    }
    res.status(200).json({ message: "User update successfully", updateUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json("user not found");
    }
    res.status(200).json({ measege: "User deleted Successfully", user });
  } catch (error) {
    if (error.name === "CastError") {
      //we can also write this to cath invalid object error
      return res.status(400).json({ error: "Invalid User ID format." });
    }
    res.status(500).json({ error: error.message });
  }
};
