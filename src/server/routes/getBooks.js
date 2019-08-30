const router = require('express').Router()
const Book = require('../database/schemas/book')

router.get('/getBooks', (req, res) => {
    // Book.find({}).then(result => {
    //     res.send(result)
    // })
    res.send([
        {
            title: 'testTitle',
            author: 'testAuthor'
        },
        {
            title: 'testTitle',
            author: 'testAuthor'
        },
        {
            title: 'testTitle',
            author: 'testAuthor'
        },
        {
            title: 'testTitle',
            author: 'testAuthor',
            price: 100
        },
    ])
})

module.exports = router