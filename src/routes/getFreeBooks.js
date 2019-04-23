const router = require('express').Router();
const Books = require('../models/Book')

router.get('/getFreeBooks', (req, res) => {

    Books.find({}).then(books => {
        if (!books) {
            res.send({
                done: false,
                msg: 'Something went wrong!'
            })
        } else {
            const freeBooks = [];
            books.map(book => {
                if (!book.price) {
                    freeBooks.push(book)
                }
            })
            if (freeBooks.length !== 0) {
                res.send({
                    done: true,
                    books: freeBooks
                })
            } else {
                res.send({
                    done: false,
                    msg: 'There is lack of free books in our library!'
                })
            }
        }
    })

})

module.exports = router;