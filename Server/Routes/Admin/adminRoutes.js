const express = require('express');
const adminRoute = express.Router();
const adminController = require('../../Controller/adminController');
const authenticate = require('../../Middleware/adminAuth')


adminRoute.post('/login', adminController.adminLogin);
adminRoute.get('/users-list',authenticate,  adminController.usersList)
adminRoute.patch('/ban-user', authenticate, adminController.banUser);
adminRoute.patch('/unban-user', authenticate, adminController.unBanUser);
adminRoute.get('/user-data', authenticate, adminController.userData);
adminRoute.patch('/block-user', authenticate, adminController.blockUser)
adminRoute.patch('/unblock-user',authenticate, adminController.unBlockUser);
adminRoute.post('/refresh-token',adminController.refreshAccessToken);
adminRoute.post('/logout', adminController.adminLogout)

module.exports = adminRoute