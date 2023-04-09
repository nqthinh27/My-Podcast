const mongoose = require('mongoose');

const saveSchema = new mongoose.Schema({
    saved: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
    }]
}, {
    timestamps: { currentTime: () => new Date(Date.now() + (7 * 60 * 60 * 1000)) },
});

module.exports = mongoose.model('save', saveSchema)