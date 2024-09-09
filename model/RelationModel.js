const mongoose = require('mongoose');
const { Schema } = mongoose;

const relationSchema = new Schema({
    user1: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    user2: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    chatId: {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
}, { timestamps: true });

const RelationModel = mongoose.model('Relation', relationSchema);

module.exports = RelationModel;
