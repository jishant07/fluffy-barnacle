var authRouter = require("express").Router();
var authController = require("../controllers/authController")
var authMiddleware = require("../middlewares/authMiddleware")

authRouter.route("/login").post(authController.login) // Can't be a secure API endpoint
authRouter.route("/verifyOTP").post(authController.verifyOTP) // Needs to have email in the Session, isAuth will be false.
authRouter.route("/signup").post(authController.signup) // Can't have the Auth Middleware
authRouter.route("/logout").get(authMiddleware,authController.logout)

module.exports = authRouter