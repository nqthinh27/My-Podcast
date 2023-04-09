const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: [{
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'user',
        },
        content: {
            type: String,
        },
    }],
    postId: {
        type: mongoose.Types.ObjectId,
        ref: 'post',
        require: true,
    }
}, {
    timestamps: { currentTime: () => new Date(Date.now() + (7 * 60 * 60 * 1000)) },
})

module.exports = mongoose.model('comment', commentSchema)