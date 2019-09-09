const router = require('express').Router()
const BoughtBooks = require('../database/schemas/boughtBooks')
const User = require('../database/schemas/user')
const uuid = require('uuid')
const passport = require('passport')

router.post('/buyBook', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { cart, email } = req.body
    User.findOne({
        email
    }).then(result => {
        if (!result) {
            res.send({
                error: true,
                errorMessage: 'Something went wrong when trying to buy a books! Contact us immediately!'
            })
        } else {
            const usersBooks = result.books
            const order = []
            cart.forEach(book => {
                let newBook = {
                    id: uuid(),
                    holder: email,
                    title: book.title,
                    author: book.author,
                    price: book.price,
                    cover: book.cover
                }
                order.push(newBook)
                usersBooks.push(newBook)
            })
            new BoughtBooks({ order }).save().then(() => {
                User.findOneAndUpdate({
                    email
                }, { books: usersBooks }, { new: true }, (error, doc) => {
                    if (error) {
                        res.send({
                            error: true,
                            errorMessage: 'Something went wrong when trying to buy a books! Contact us immediately!'
                        })
                    } else {
                        res.send({
                            success: true,
                            successMessage: 'Your transaction was finished successfully! Check out bought books in your profile'
                        })
                    }
                });
            }).catch(error => {
                if (error) {
                    res.send({
                        error: true,
                        errorMessage: 'Something went wrong when trying to buy a books! Contact us immediately!'
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

module.exports = router;