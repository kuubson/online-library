const router = require('express').Router()
const BorrowedBook = require('../database/schemas/borrowedBook')
const User = require('../database/schemas/user')
const uuid = require('uuid')
const passport = require('passport')

router.post('/borrowBook', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { email, title, author, cover } = req.body
    BorrowedBook.findOne({
        holder: email,
        title,
        author
    }).then(result => {
        if (result) {
            res.send({
                warning: true,
                warningMessage: 'You have already checked out this book!'
            })
        } else {
            User.findOne({
                email
            }).then(result => {
                if (!result) {
                    res.send({
                        error: true,
                        errorMessage: 'Something went wrong when trying to borrow a book! Try later!'
                    })
                } else {
                    const usersBooks = result.books
                    const newBook = {
                        id: uuid(),
                        holder: email,
                        title,
                        author,
                        cover
                    }
                    usersBooks.push(newBook)
                    new BorrowedBook(newBook).save().then(() => {
                        User.findOneAndUpdate({
                            email
                        }, { books: usersBooks }, { new: true }, (error, doc) => {
                            if (error) {
                                res.send({
                                    error: true,
                                    errorMessage: 'Something went wrong when trying to borrow a book! Try later!'
                                })
                            } else {
                                res.send({
                                    success: true,
                                    successMessage: 'You have checked out book successfully!'
                                })
                            }
                        });
                    }).catch(error => {
                        if (error) {
                            res.send({
                                error: true,
                                errorMessage: 'Something went wrong when trying to borrow a book! Try later!'
                            })
                        }
                    })
                }
            }).catch(error => {
                if (error) {
                    res.send({
                        error: true,
                        errorMessage: 'Something went wrong when trying to borrow a book! Try later!'
                    })
                }
            })
        }
    }).catch(error => {
        if (error) {
            res.send({
                error: true,
                errorMessage: 'Something went wrong when trying to borrow a book! Try later!'
            })
        }
    })
})

module.exports = router;