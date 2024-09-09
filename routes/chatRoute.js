

const express = require('express');
const chatRouter = express.Router();
const isAuthenticated = require('../middlewares/authCheck')

const chatController = require('../controllers/chatController');

// Define routes with the correct HTTP methods
chatRouter.get('/:chatId',isAuthenticated, chatController.getChat);

module.exports = chatRouter;
