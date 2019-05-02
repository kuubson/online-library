const router = require('express').Router();
const BorrowedBook = require('../models/BorrowedBook');
const User = require('../models/User');
const passport = require('passport');

router.post('/borrowBook', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { email, book } = req.body;

    BorrowedBook.findOne({
        email,
        title: book.title,
        author: book.author
    }).then(result => {
        if (result) {
            res.send({
                done: false,
                msg: 'You have already checked out this book!'
            })
        } else {
            const newBook = {
                email,
                title: book.title,
                author: book.author,
                cover: book.cover
            }
            User.findOne({
                email
            }).then(user => {
                if (!user) {
                    res.send({
                        done: false,
                        msg: 'Something went wrong! Try again!'
                    })
                } else {
                    const currentBooks = user.books;
                    currentBooks.push(newBook);
                    const conditions = { email }
                    const update = { books: currentBooks }
                    const options = { new: true, useFindAndModify: false }
                    User.findOneAndUpdate(conditions, update, options, (error, doc) => {
                        if (error) {
                            res.send({
                                done: false,
                                msg: 'Something went wrong! Try again!'
                            })
                        } else {
                            new BorrowedBook({
                                email,
                                title: book.title,
                                author: book.author
                            }).save((error) => {
                                if (error) {
                                    res.send({
                                        done: false,
                                        msg: 'Something went wrong! Try again!'
                                    })
                                } else {
                                    res.send({
                                        done: true,
                                        msg: 'You successfully have checked out a book!'
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})

module.exports = router;