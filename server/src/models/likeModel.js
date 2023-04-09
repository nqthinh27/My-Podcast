const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    liked: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }]
}, {
    timestamps: { currentTime: () => new Date(Date.now() + (7 * 60 * 60 * 1000)) },
});

module.exports = mongoose.model('like', likeSchema)