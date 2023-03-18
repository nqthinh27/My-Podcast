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
    },
    postId: {
        type: mongoose.Types.ObjectId,
        ref: 'post',
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('comment', commentSchema)