const mongoose = require('mongoose')
const {Schema} = mongoose;

const userSchema = new Schema(
    {
        username: String,
        hashedPassword: String,
    },
    { timestamps: true }
)

const UserModel = mongoose.model('User', userSchema);


export default UserModel;
