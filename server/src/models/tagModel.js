const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    tag: { type: String, required: true },
    postIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'post' }]
}, {
    timestamps: { currentTime: () => new Date(Date.now() + (7 * 60 * 60 * 1000)) },
});

module.exports = mongoose.model('tag', tagSchema);