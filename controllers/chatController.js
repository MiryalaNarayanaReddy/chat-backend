const mongoose = require('mongoose');
const ChatModel = require('../model/ChatModel')

const getChat = async (req, res) => {
    try {
        
        const user = req.user;
        const { chatId } = req.params;
        const chat = await ChatModel.findOne({ _id: chatId });
        if (!chat) {
            return res.status(400).json({ error: 'Chat not found' });
        }
        res.status(200).json({ chat });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    
};



module.exports = { getChat};
