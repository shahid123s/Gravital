const express = require('express');
const adminRoute = express.Router();
const adminController = require('../../Controller/adminController');



adminRoute.post('/login', adminController.adminLogin);
adminRoute.get('/users-list', adminController.usersList)
adminRoute.patch('/ban-user', adminController.banUser);
adminRoute.patch('/unban-user',adminController.unBanUser);
adminRoute.get('/user-data', adminController.userData);
adminRoute.patch('/block-user', adminController.blockUser)
adminRoute.patch('/unblock-user', adminController.unBlockUser)
module.exports = adminRoute