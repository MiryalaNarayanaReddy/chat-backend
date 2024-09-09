const mongoose = require('mongoose');
const ChatModel = require('../model/ChatModel')

const getChat = async (req, res) => {
    try {
        const { _id } = req.user._id

        // get chat
       

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



module.exports = { getChat};
