const mongoose = require('mongoose');

const UserModel = require('../model/UserModel');
const RelationModel = require('../model/RelationModel');
const ChatModel = require('../model/ChatModel');

const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({}, { username: true, _id: true });
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const addChat = async (req, res) => {

    try {
        const { add_user_id } = req.body;

        // get from middleware req.user = data.username;
        const user = req.user; // gives undefined if you use ===>  const {user} = req.user;

        const _chat = await ChatModel.create({
            messages: []
        })

        const relation1 = await RelationModel.create(
            {
                user1: user._id,
                user2: add_user_id,
                chatId: _chat._id
            }
        )

        const relation2 = await RelationModel.create(
            {
                user1: add_user_id,
                user2: user._id,
                chatId: _chat._id
            }
        )

        res.status(200).json({ chatId: _chat._id });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { getAllUsers, addChat };