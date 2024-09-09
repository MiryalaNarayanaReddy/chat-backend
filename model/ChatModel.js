const mongoose = require('mongoose');
const { Schema } = mongoose;

// Message schema to store individual messages
const messageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  originalMessage:{
    type: String,
    required: true
  },
  translatedMessage: String,
  originalLanguage:  String,
  translatedLanguage:  String,
  status: Boolean,
}, { timestamps: true});

// Chat schema to store chat details with participants and messages
const chatSchema = new Schema({
  messages: [messageSchema]
}, { timestamps: true });

const ChatModel = mongoose.model('Chat', chatSchema);

module.exports = ChatModel;
