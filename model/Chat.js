const mongoose = require('mongoose');
const { Schema } = mongoose;


const UserModel = require('./User'); 


const messageSchema = new Schema({
  message_id: { type: Number, required: true },
  sender_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  original_msg: { type: String, required: true },
  translated_msg: { type: String, required: true },
  original_language: { type: String, required: true },
  translated_language: { type: String, required: true },
  timestamp: { type: Date, required: true },
  status: { type: String, enum: ['read', 'unread'], required: true }
}, { _id: false }); 


const chatSchema = new Schema({
  chat_id: { type: Number, required: true, unique: true },
  participants: { 
    type: [Schema.Types.ObjectId], 
    ref: 'User', 
    required: true 
  },
  messages: { type: [messageSchema], required: true }
}, { timestamps: true });


const ChatModel = mongoose.model('Chat', chatSchema);

module.exports = ChatModel;
