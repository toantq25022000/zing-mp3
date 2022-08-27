const express = require("express");
const route = express.Router();
const userController = require("../app/controllers/UserControllers");

route.get("/current-user", userController.checkExists);

module.exports = route;
