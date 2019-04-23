const router = require('express').Router();
const Books = require('../models/Book')

router.get('/getPaidBooks', (req, res) => {

    Books.find({}).then(books => {
        if (!books) {
            res.send({
                done: false,
                msg: 'Something went wrong!'
            })
        } else {
            const paidBooks = [];
            books.map(book => {
                if (book.price) {
                    paidBooks.push(book)
                }
            })
            if (paidBooks.length !== 0) {
                res.send({
                    done: true,
                    books: paidBooks
                })
            } else {
                res.send({
                    done: false,
                    msg: 'There is lack of paid books in our library!'
                })
            }
        }
    })

})

module.exports = router;