const express = require('express');
const userRoute = express.Router();
const userController = require('../../Controller/userController');
const {authenticateUser: authenticate}  = require ('../../Middleware/userAuth');


userRoute.post('/send-otp', userController.sendotp);
userRoute.post('/otp-verification', userController.otpVerification);
userRoute.post('/register', userController.register);
userRoute.post('/login', userController.login);
userRoute.post('/logout', userController.logout)
userRoute.post('/reset-password/email', userController.resetPasswordEmail);
userRoute.post('/reset-password', userController.resetPassword);

userRoute.post('/refresh-token', userController.refreshAccessToken)


userRoute.post('/post', authenticate, userController.post)

module.exports = userRoute