const router = require('express').Router();
const User = require('../models/User')

router.post('/getBorrowedBooks', (req, res) => {

    const { email } = req.body;

    User.findOne({
        email
    }).then(user => {
        if (!user) {
            res.send({
                done: false,
                msg: 'Something went wrong!'
            })
        } else {
            const books = user.books;
            const borrowedBooks = [];
            books.forEach(book => {
                if (!book.price) {
                    borrowedBooks.push(book);
                }
            })
            res.send({
                borrowedBooks,
                done: true
            })
        }
    })
})

module.exports = router;