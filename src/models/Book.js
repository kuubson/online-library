const mongoose = require('mongoose');

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
        type: Number
    },
    cover: {
        data: Buffer,
        contentType: String,
    }
})

const Book = mongoose.model('Book', BookSchema, 'books');

module.exports = Book;