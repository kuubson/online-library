const router = require('express').Router()
const Book = require('../database/schemas/book')

router.post('/uploadBook', (req, res) => {
    const { bookTitle, bookAuthor, bookCover } = req.body
    console.log(bookTitle, bookAuthor, bookCover)
})

module.exports = router