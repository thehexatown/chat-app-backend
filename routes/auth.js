const express = require("express");
const Auth = express.Router();
const Employee = require("../models/user");
const authContrller = require("../controllers/auth");

//register Employee
Auth.post("/register", authContrller.register);

//login Employeee
Auth.post("/login", authContrller.login);
Auth.post("/", authContrller.getUsers);
Auth.get("/:id", authContrller.getSingleUser);

module.exports = Auth;
