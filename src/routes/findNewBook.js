const router = require('express').Router();
const Books = require('../models/Book')

router.post('/findNewBook', (req, res) => {

    const { title } = req.body;

    const properTitle = req.body.title.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');

    Books.findOne({
        title: properTitle
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

})

module.exports = router;