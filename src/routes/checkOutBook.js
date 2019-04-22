const router = require('express').Router();
const CheckedOutBook = require('../models/CheckedOutBook');
const User = require('../models/User');

router.post('/checkOutBook', (req, res) => {

    const { email, author, title, cover } = req.body;

    CheckedOutBook.findOne({
        email,
        author,
        title
    }).then(result => {
        if (result) {
            res.send({
                done: false,
                msg: 'You have already checked out this book!'
            })
        } else {
            User.findOne({
                email,
            }).then(user => {
                if (!user) {
                    res.send({
                        done: false,
                        msg: 'Something went wrong! Try again!'
                    })
                } else {
                    const book = {
                        author,
                        title,
                        cover
                    }
                    const updatedBooks = user.books;
                    updatedBooks.push(book);
                    User.findOneAndUpdate({
                        email
                    }, {
                            books: updatedBooks
                        }, {
                            new: true,
                            useFindAndModify: false
                        }, (error, doc) => {
                            if (error) {
                                res.send({
                                    done: false,
                                    msg: 'Something went wrong! Try again!'
                                })
                            } else {
                                User.findOne({
                                    email
                                }).then(user => {
                                    if (!user) {
                                        res.send({
                                            done: false,
                                            msg: 'Something went wrong! Try again!'
                                        })
                                    } else {
                                        new CheckedOutBook({
                                            email,
                                            author,
                                            title
                                        }).save().then(res.send({
                                            done: true,
                                            msg: 'You successfully have checked out a book!'
                                        }));
                                    }
                                })
                            }
                        });
                }
            })
        }
    })
})

module.exports = router;