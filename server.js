const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const expenseRoutes = require("./routes/expenseRoutes");
const authRoutes = require("./routes/authRoutes")
const uploadRoutes = require("./routes/uploadRoutes")

// Connect database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connect"))
  .catch((err) => console.error("Connecton error: ", err));

// Setting view engine and path
app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views") )

app.use(cors());
app.use(express.json());

// Define simple route
app.get("/", (req, res) => {
  return res.send("Home Page!");
});

app.use("/expenses", expenseRoutes);
app.use("/files", uploadRoutes)
app.use("/user", authRoutes)

app.listen(3000, () => {
  console.log(`Server is running at http://localhost:3000`);
});
