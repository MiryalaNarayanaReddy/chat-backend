const express = require('express');
const authRouter = express.Router();
const authUser = require('../controllers/authController');

// Define routes with the correct HTTP methods
authRouter.route('/signup').post(authUser.signup);
authRouter.route('/login').post(authUser.login); // Changed from GET to POST

module.exports = authRouter;
