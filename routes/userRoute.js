const express = require('express');

const userRouter = express.Router();

const isAuthenticated = require('../middlewares/authCheck')

const userController = require('../controllers/userController');

// get user names and ids

userRouter.get('/all',isAuthenticated,userController.getAllUsers);
userRouter.post('/addChat',isAuthenticated,userController.addChat);

module.exports = userRouter;