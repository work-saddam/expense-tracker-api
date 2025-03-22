const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1]; //Retrive token properly

  if (!token) return res.status(401).json({ error: "Access denied!" });

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};
