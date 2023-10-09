const express = require("express");
const userRoute = express.Router();
const { loginUser, registerUser } = require("../controllers/user.controller");

userRoute.post("/signup", registerUser);
userRoute.post("/login", loginUser);

module.exports = userRoute;
