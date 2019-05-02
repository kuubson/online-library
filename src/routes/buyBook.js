const router = require('express').Router();
const BoughtBook = require('../models/BoughtBook');
const User = require('../models/User');
const passport = require('passport');

router.post('/buyBook', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { email, cart } = req.body;

    User.findOne({
        email
    }).then(user => {
        if (!user) {
            res.send({
                done: false,
                msg: 'Something went wrong! Try again!'
            })
        } else {
            const order = [];
            const currentBooks = user.books;
            cart.forEach(book => {
                currentBooks.push(book);
                order.push({
                    title: book.title,
                    author: book.author,
                    price: book.price
                })
            })
            const conditions = { email }
            const update = { books: currentBooks }
            const options = { new: true, useFindAndModify: false }
            User.findOneAndUpdate(conditions, update, options, (error, doc) => {
                if (error) {
                    res.send({
                        done: false,
                        msg: 'Something went wrong! Try again!'
                    })
                } else {
                    new BoughtBook({
                        email,
                        order
                    }).save((error) => {
                        if (error) {
                            res.send({
                                done: false,
                                msg: 'Something went wrong! Try again!'
                            })
                        } else {
                            res.send({
                                done: true,
                                msg: 'You successfully have bought books!'
                            })
                        }
                    })
                }
            })
        }
    })
})

module.exports = router;