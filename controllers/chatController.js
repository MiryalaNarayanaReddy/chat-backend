const mongoose = require('mongoose');
const ChatModel = require('../model/ChatModel')
const RelationModel = require('../model/RelationModel')
const UserModel = require('../model/UserModel')

// API to get chat details by chat ID
const getChat = async (req, res) => {
  try {
    const { chatId } = req.params;

    // Find chat by ID and populate messages
    const chat = await ChatModel.findOne({ _id: chatId }).populate('messages.sender', 'username');

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

    // Step 1: Get chat relations by user1 (authenticated user)
    const _chats = await RelationModel.find({ user1: user._id }).select('chatId user2');

    // Step 2: For each relation, get the username of user2 by ID
    const chats = await Promise.all(
      _chats.map(async (chat) => {
        const user2 = await UserModel.findById(chat.user2).select('username'); // Get user2's username
        return {
          chat_id: chat.chatId,
          user2: {
            username: user2.username // Attach user2's username
          }
        };
      })
    );

    // Step 3: Return the final response
    res.status(200).json({ chats });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = { getChat, getAllChats };
