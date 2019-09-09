const router = require('express').Router()
const Book = require('../database/schemas/book')
const passport = require('passport')

router.get('/getBooksForStore', passport.authenticate('jwt', { session: false }), (req, res) => {
    Book.find({}).then(result => {
        res.send(result)
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