const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    // tag: Object,
    // reply: mongoose.Types.ObjectId,
    // likes: [{type: mongoose.Types.ObjectId, ref: 'user'}],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    post: {
        type: mongoose.Types.ObjectId,
        ref: 'post',
        required: true
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('comment', commentSchema)