const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    content: String,
    image: {
        type: String,
        default: 'https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/avatar%2Fdafault_avatar.png?alt=media&token=162dc660-5039-4636-a300-942fcd4330b3',
    },
    audio: {
        type: String,
        require: true,
    },
    likes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'user',
        }
    ],
    comments: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'comment'
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        require: true,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('post', postSchema);