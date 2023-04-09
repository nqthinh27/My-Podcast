const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    history: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }]
}, {
    timestamps: { currentTime: () => new Date(Date.now() + (7 * 60 * 60 * 1000)) },
});

module.exports = mongoose.model('history', historySchema)