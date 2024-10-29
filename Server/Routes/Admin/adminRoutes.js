const express = require('express');
const adminRoute = express.Router();
const adminController = require('../../Controller/adminController');



adminRoute.post('/login', adminController.adminLogin);



module.exports = adminRoute