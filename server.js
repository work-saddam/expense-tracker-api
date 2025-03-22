const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

// Connect database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connect"))
  .catch((err) => console.error("Connecton error: ", err));


app.use(cors());
app.use(express.json());

// Define simple route
app.get("/", (req, res) => {
  return res.send("Home Page!");
});

app.listen(3000, () => {
  console.log(`Server is running at http://localhost:3000`);
});
