const router = require('express').Router();
const User = require('../models/User');
const CheckedOutBooks = require('../models/CheckedOutBook');

router.post('/getUsersBooks', (req, res) => {
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
            const usersBooks = user.books;
            const boughtBooks = [];
            const checkedOutBooks = [];
            usersBooks.forEach(book => {
                if (book.price) {
                    boughtBook.push(book);
                } else {
                    checkedOutBooks.push(book);
                }
            })
            res.send({
                boughtBooks,
                checkedOutBooks,
                done: true
            })
        }
    })
});

module.exports = router;