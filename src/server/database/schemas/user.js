const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    borrowedBooks: {
        type: Array,
        default: []
    },
    boughtBooks: {
        type: Array,
        default: []
    }
})

const User = new mongoose.model('User', UserSchema, 'Users')

module.exports = User
