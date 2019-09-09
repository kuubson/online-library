const router = require('express').Router()
const User = require('../database/schemas/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/login', (req, res) => {
    const { email, password } = req.body
    User.findOne({
        email
    }).then(result => {
        if (!result) {
            res.send({
                error: true,
                errorMessage: 'This e-mail is not registered!'
            })
        } else {
            bcrypt.compare(password, result.password, (error, proper) => {
                if (error) {
                    res.send({
                        error: true,
                        errorMessage: 'Something went wrong when trying to log in! Try later!'
                    })
                } else if (!proper) {
                    res.send({
                        warning: true,
                        warningMessage: 'You have provided a bad password!'
                    })
                } else {
                    const token = jwt.sign({ email }, process.env.JWT_KEY, { expiresIn: '7d' })
                    res.send({
                        success: true,
                        successMessage: 'You have successfully logged in!',
                        token
                    })
                }
            })
        }
    }).catch(error => {
        if (error) {
            res.send({
                error: true,
                errorMessage: 'Something went wrong when trying to log in! Try later!'
            })
        }
    })
})

module.exports = router;