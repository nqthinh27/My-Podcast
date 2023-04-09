const mongoose = require('mongoose');

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
        default: 'https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/avatar%2Fdefault_user_avatar.png?alt=media&token=87368bce-cabf-45f8-8fbc-5db59ee3fb92',
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
    followers: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'user',
        }
    ],
    following: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'user',
        }
    ],
    posts: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'post',
        }
    ],
    liked: {
        type: mongoose.Types.ObjectId,
        ref: 'liked',
    },
    saved: {
        type: mongoose.Types.ObjectId,
        ref: 'saved',
    },
    history: {
        type: mongoose.Types.ObjectId,
        ref: 'history',
    },
    playlist: {
        type: mongoose.Types.ObjectId,
        ref: 'playlist',
    },
}, {
    timestamps: { currentTime: () => new Date(Date.now() + (7 * 60 * 60 * 1000)) },
});

module.exports = mongoose.model('user', userSchema);