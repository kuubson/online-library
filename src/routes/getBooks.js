const router = require('express').Router();

const Books = require('../models/Book');

router.post('/getBooks', (req, res) => {

    Books.find({}).then(books => {
        if (books) {
            res.send({
                books
            })
        }
    })

});

module.exports = router;