const router = require('express').Router()
const Book = require('../database/schemas/book')
const fs = require('fs')

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

router.post('/uploadBook', upload.single('bookCover'), (req, res) => {
    const { bookTitle, bookAuthor } = req.body
    new Book({
        title: bookTitle,
        author: bookAuthor,
        cover: {
            data: fs.readFileSync(req.file.path),
            contentType: 'image/png'
        }
    }).save().then(() => {
        res.send({
            success: true,
            successMessage: 'Your book has been added to the store!'
        })
    }).catch(error => {
        if (error) {
            res.send({
                error: true,
                errorMessage: 'Something went wrong when uploading your book! Try again later!'
            })
        }
    })
})

module.exports = router