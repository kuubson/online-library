const router = require('express').Router()
const User = require('../database/schemas/user')
const bcrypt = require('bcrypt')

router.post('/register', (req, res) => {
    const { name, surname, email, password } = req.body
    User.findOne({
        email
    }).then(result => {
        if (result) {
            res.send({
                warning: true,
                warningMessage: 'This e-mail is already registered! Try another one or log in!'
            })
        } else {
            bcrypt.hash(password, 10, (error, hashedPassword) => {
                if (error) {
                    res.send({
                        error: true,
                        errorMessage: 'Something went wrong when creating a new account! Try later!'
                    })
                } else {
                    new User({
                        name,
                        surname,
                        email,
                        password: hashedPassword,
                    }).save().then(() => {
                        res.send({
                            success: true,
                            successMessage: 'You have been successfully registered an account!'
                        })
                    }).catch(error => {
                        if (error) {
                            res.send({
                                error: true,
                                errorMessage: 'Something went wrong when creating a new account! Try later!'
                            })
                        }
                    })
                }
            })
        }
    }).catch(error => {
        if (error) {
            res.send({
                error: true,
                errorMessage: 'Something went wrong when creating a new account! Try later!'
            })
        }
    })
})

module.exports = router