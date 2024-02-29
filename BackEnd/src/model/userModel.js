const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    profilePicture: {
        type: String
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('User', userSchema);
