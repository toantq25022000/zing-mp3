const express = require("express");
const route = express.Router();
const authController = require("../app/controllers/AuthControllers");
const userController = require("../app/controllers/UserController");
const verifyToken = require("../middleware/auth");

// UserController
route.get("/current-user", verifyToken, userController.getCurrentUser);

// AuthController
route.get("/check-exists", authController.checkExists);
route.post("/signup-with-email", authController.signUpWithEmail);
route.post("/login", authController.loginWithEmail);

module.exports = route;
