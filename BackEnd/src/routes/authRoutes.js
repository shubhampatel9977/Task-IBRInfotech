const express = require("express");
const { signUp, logIn } = require("../controllers/authController");

const userRoute = express.Router();

userRoute.post("/register", signUp);
userRoute.post("/login", logIn);

module.exports = userRoute;