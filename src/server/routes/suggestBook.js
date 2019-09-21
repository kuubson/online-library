const router = require('express').Router()
const Books = require('../database/schemas/book')
const passport = require('passport')

router.post('/suggestBook', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { title } = req.body
    const regex = new RegExp("^" + title, "i");
    Books.find({
        title: regex
    }).then(result => {
        res.send(result)
    }).catch(error => {
        if (error) {
            res.send({
                error: true,
                errorMessage: 'Something went wrong! Try later!'
            })
        }
    })
})

module.exports = router;