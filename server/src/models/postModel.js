const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    content: String,
    image: {
        type: String,
        require: true,
    },
    audio: {
        type: String,
        require: true,
    },
    likes: {
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
    tag: {
        type: [String],
        default: [],
    },
    // album: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'album',
    // },
}, {
    timestamps: { currentTime: () => new Date(Date.now() + (7 * 60 * 60 * 1000)) }
})

module.exports = mongoose.model('post', postSchema);