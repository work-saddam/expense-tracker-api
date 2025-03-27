const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController.js")


router.post("/signup", authController.signupUser);
router.post("/login", authController.loginUser);

module.exports = router;
