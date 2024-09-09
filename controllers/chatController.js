const mongoose = require('mongoose');
const ChatModel = require('../model/ChatModel')
const RelationModel = require('../model/RelationModel')
const UserModel = require('../model/UserModel')

const getChat = async (req, res) => {
    try {
        
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

const getAllChats = async (req, res) => {
    try {
        const user = req.user;
        const _chats = await RelationModel.find ({user1:user._id}); // get all the chats of the user
        res.status(200).json({ chats: _chats });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { getChat, getAllChats };
