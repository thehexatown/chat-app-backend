const express = require("express");
const Auth = express.Router();
const User = require("../models/user");
const userController = require("../controllers/auth");

//search users
Auth.get("/search", userController.searchUsers);

module.exports = Auth;
