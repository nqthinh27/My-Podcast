const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: 'https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/avatar%2Fdafault_avatar.png?alt=media&token=162dc660-5039-4636-a300-942fcd4330b3',
    },
    role: {
        type: String,
        default: 'user',
    },
    gender: {
        type: String,
        default: 'male',
    },
    mobile: {
        type: String,
        default: '',
    },
    address: {
        type: String,
        default: '',
    },
    story: {
        type: String,
        default: '',
        maxlength: 200,
    },
    website: {
        type: String,
        default: '',
    },
    website: {
        type: String,
        default: '',
    },
    followers: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        }
    ],
    following: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        }
    ],
}, {
    timestamps: true,
});

module.exports = mongoose.model("user", userSchema);