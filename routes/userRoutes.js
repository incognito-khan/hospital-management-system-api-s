const express = require('express');
const { authController } = require('../controller/loginController.js');
// const { verifyToken } = require('../tokenVerfication/tokenVerification.js');


const userRouter = express.Router();

// userRouter.post("/signup", signUpController)
// userRouter.get("/login", loginController)
userRouter.post("/login", authController.login.bind(authController));
// userRouter.get("/login", verifyToken, authController.login.bind(authController));
// userRouter.get("/verify", verifyToken);



module.exports = userRouter;