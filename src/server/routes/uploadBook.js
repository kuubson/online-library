const router = require('express').Router()
const Book = require('../database/schemas/book')
const passport = require('passport')
const gridfsUpload = require('../database/database').gridfsUpload

router.post('/uploadBook', gridfsUpload.single('bookCover'), passport.authenticate('jwt', { session: false }), (req, res) => {
    const { bookTitle, bookAuthor } = req.body
    Book.findOne({
        title: bookTitle,
        author: bookAuthor
    }).then(result => {
        if (result) {
            res.send({
                warning: true,
                warningMessage: 'This book is already in our store!'
            })
        } else {
            new Book({
                title: bookTitle,
                author: bookAuthor,
                price: undefined,
                cover: `https://online-library-application.herokuapp.com/books/${req.file.filename}`
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
        }
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