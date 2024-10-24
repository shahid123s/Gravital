const express = require('express');
const userRoute = express.Router();
const userController = require('../Controller/userController');



userRoute.post('/register', userController.register)


module.exports = userRoute