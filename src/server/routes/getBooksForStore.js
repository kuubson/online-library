const router = require('express').Router()
const Book = require('../database/schemas/book')
const passport = require('passport')

router.post('/getBooksForStore', passport.authenticate('jwt', { session: false }), (req, res) => {
    Book.find({}).then(result => {
        res.send(result)
    }).catch(error => {
        if (error) {
            res.send({
                error: true,
                errorMessage: 'Something went wrong! Restart your application!'
            })
        }
    })
})

module.exports = router