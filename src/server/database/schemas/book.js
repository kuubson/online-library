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
        data: {
            type: Buffer,
            required: true
        },
        contentType: String
    }
})

const Book = new mongoose.model('Book', BookSchema, 'Books')

module.exports = Book
