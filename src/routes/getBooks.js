const router = require('express').Router();

const Book = require('../models/Book');

router.post('/getBooks', (req, res) => {

    const booktitle = req.body.booktitle.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');

    Book.findOne({
        title: booktitle
    }).then(book => {
        if (book) {
            res.send({
                done: true,
                book
            })
        } else {
            res.send({
                done: false,
                msg: `We don't have this book in our store!`
            })
        }
    })

});

module.exports = router;