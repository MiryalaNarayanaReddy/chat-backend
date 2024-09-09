const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        username: { type: String, required: true },
        hashedPassword: { type: String, required: true },
    },
    { timestamps: true }
);

// Register the model
const UserModel = mongoose.model('UserModel', userSchema);

module.exports = UserModel;
