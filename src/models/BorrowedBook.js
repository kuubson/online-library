const mongoose = require('mongoose');

const BorrowedBookSchema = new mongoose.Schema({
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

const BorrowedBook = mongoose.model('BorrowedBook', BorrowedBookSchema, 'borrowedBooks');

module.exports = BorrowedBook;