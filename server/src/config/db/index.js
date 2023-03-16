const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/my_podcast', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect to database successfully!!');
    } catch (error) {
        console.log('Connect to database failure!!');
    }
}

module.exports = { connect };