const mongoose = require('mongoose');

const UserModel = require('../model/UserModel');
const RelationModel = require('../model/RelationModel');
const ChatModel = require('../model/ChatModel');

const getAllUsers = async (req, res) => {
    try {
        // get only username and _id

        // const users = await UserModel.find();

        const users = await UserModel.find({}, { username: true, _id: true });

        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const addChat = async (req, res) => {   

    try {
        const { user2 } = req.body;
        
        // get from middleware req.user = data.username;
        const user = req.user; // giving undefined

        console.log(user);

        const user_1 = await UserModel.findOne({username:user});
        const user_2 = await  UserModel.findOne({username:user2});

        console.log(user_1);
        console.log(user_2);



        const _chat = await ChatModel.create({
            messages:[]
        })

        console.log(_chat._id);

        // Cannot read properties of null (reading '_id')

        const relation1 = await RelationModel.create(
            {
                user1:user_1._id,
                user2:user_2._id,
                chatId:_chat._id
            }
        )

        const relation2 = await RelationModel.create(
            {
                user1:user_2._id,
                user2:user_1._id,
                chatId:_chat._id
            }
        )

        res.status(200).json({ chatId:_chat._id });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}




module.exports = { getAllUsers , addChat};