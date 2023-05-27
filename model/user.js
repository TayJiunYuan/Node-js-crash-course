const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema defines the structure of the documents
const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    gender: {
        type: String,
        required: true
    }
}, { timestamps: true });

//model provides the interface to interact with the DB
//the first param 'User' should be the singular of the collection in DB
const User = mongoose.model('User', userSchema);

module.exports = User;