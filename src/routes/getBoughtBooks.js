const router = require('express').Router();
const User = require('../models/User')

router.post('/getBoughtBooks', (req, res) => {

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
            const boughtBooks = [];
            books.forEach(book => {
                if (book.price) {
                    boughtBooks.push(book);
                }
            })
            res.send({
                boughtBooks,
                done: true
            })
        }
    })
})

module.exports = router;