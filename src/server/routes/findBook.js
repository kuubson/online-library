const router = require('express').Router()
const Book = require('../database/schemas/book')
const passport = require('passport')

router.post('/findBook', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { bookTitle } = req.body
    Book.findOne({
        title: bookTitle
    }).then(result => {
        if (!result) {
            res.send({
                warning: true,
                warningMessage: 'There is no such a book in our store!'
            })
        } else {
            res.send({
                success: true,
                successMessage: 'We found a book for you! Check out store!',
                book: result
            })
        }
    }).catch(error => {
        if (error) {
            res.send({
                error: true,
                errorMessage: 'Something went wrong when trying to find a book! Try later!'
            })
        }
    })
})

module.exports = router;