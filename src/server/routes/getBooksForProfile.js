const router = require('express').Router()
const User = require('../database/schemas/user')
const passport = require('passport')

router.post('/getBooksForProfile', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { email } = req.body
    User.findOne({
        email
    }).then(result => {
        res.send(result.books)
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