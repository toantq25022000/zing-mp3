const mongoose = require('mongoose');

async function connect () {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@zing-mp3.t6ywc.mongodb.net/?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connect successfully!!')
    } catch(error) {
        console.log(error.message);
        process.exit(1);
    }
};

module.exports = { connect };
