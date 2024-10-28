const express = require('express');
const userRoute = express.Router();
const userController = require('../Controller/userController');



userRoute.post('/send-otp', userController.sendotp);
userRoute.post('/otp-verification', userController.otpVerification);
userRoute.post('/register', userController.register);
userRoute.post('/login', userController.login);

userRoute.post('/refresh-token', userController.refreshAccessToken)


module.exports = userRoute