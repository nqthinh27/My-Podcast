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
    likes:{
        type: Number,
        default: 0,
    },
    comments: {
        type: Number,
        default: 0,
    },
    views: {
        type: Number,
        default: 0,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        require: true,
    },
}, {
    timestamps: { currentTime: () => new Date(Date.now() + (7 * 60 * 60 * 1000)) }
})

module.exports = mongoose.model('post', postSchema);