const mongoose = require('mongoose')

const BorrowedBookSchema = new mongoose.Schema({
    holder: {
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
    },
    cover: {
        type: String,
        required: true
    }
})

const BorrowedBook = new mongoose.model('BorrowedBook', BorrowedBookSchema, 'BorrowedBooks')

module.exports = BorrowedBook
