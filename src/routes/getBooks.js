const router = require('express').Router();

const Books = require('../models/Book');

router.get('/getBooks', (req, res) => {

    Books.find({}).then(books => {
        if (books) {
            const freebooks = [];
            const paidbooks = [];
            books.forEach(book => {
                if (book.price) {
                    paidbooks.push(book);
                } else {
                    freebooks.push(book);
                }
            })
            res.send({
                freebooks,
                paidbooks
            })
        }
    })

});

module.exports = router;