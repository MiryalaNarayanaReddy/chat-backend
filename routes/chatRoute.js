

const express = require('express');
const chatRouter = express.Router();
const isAuthenticated = require('../middlewares/authCheck')

const chatController = require('../controllers/chatController');

// Define routes with the correct HTTP methods
// chatRouter.get('/chat/:chatId',isAuthenticated,)

module.exports = chatRouter;
