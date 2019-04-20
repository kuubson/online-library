const mongoose = require('mongoose');

const CheckedOutBookSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
})

const CheckedOutBook = mongoose.model('CheckedOutBook', CheckedOutBookSchema, 'checkedOutBooks');

module.exports = CheckedOutBook;