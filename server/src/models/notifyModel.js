const mongoose = require('mongoose');

const notifySchema = new mongoose.Schema({
    sender: { 
        type: mongoose.Types.ObjectId, 
        ref: 'user' 
    },
    recipient: { 
        type: mongoose.Types.ObjectId, 
        ref: 'user' 
    },
    content: String,
    image: String,
    isRead: { 
        type: Boolean, 
        default: false 
    }
}, {
    timestamps: { currentTime: () => new Date(Date.now() + (7 * 60 * 60 * 1000)) }
})

module.exports = mongoose.model('notify', notifySchema);