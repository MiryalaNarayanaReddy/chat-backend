const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../model/UserModel');  // Adjust the path if needed

const JWT_SECRET = process.env.JWT_SECRET || 'chatAPI';  // Use environment variable for secret

const signup = async (req, res) => {
    try {
        
        const { username, password } = req.body;

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await UserModel.create({
            username,
            hashedPassword
        });

        res.status(201).json({ user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Username not found' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!isMatch) {
            return res.status(400).json({ error: 'Incorrect password' });
        }

        // Generate token
        const token = jwt.sign({ username: user.username }, JWT_SECRET);

        res.status(200).json({ token, message: 'Successfully logged in' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { signup, login };
