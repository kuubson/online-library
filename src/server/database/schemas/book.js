const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: String,
        default: null
    },
    cover: {
        type: Buffer,
        required: true
    }
})

const Book = new mongoose.model('Book', BookSchema, 'Books')

module.exports = Book
