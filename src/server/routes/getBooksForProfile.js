const router = require('express').Router()
const User = require('../database/schemas/user')

router.post('/getBooksForProfile', (req, res) => {
    const { email } = req.body
    // User.findOne({
    //     email
    // }).then(result => {
    //     res.send(result.books)
    // })
    res.send([
        {
            title: `testTitle${Math.random()}`,
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