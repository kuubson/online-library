const router = require('express').Router()
const passport = require('passport')
const paypal = require('paypal-rest-sdk')

let total;

router.post('/paypal', passport.authenticate('jwt', { session: false }), (req, res) => {
    total = req.body.total
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "https://online-library-application.herokuapp.com/paypalSuccess",
            "cancel_url": "https://online-library-application.herokuapp.com/paypalCancel"
        },
        "transactions": [{
            "item_list": {
                "items": req.body.cart.map(book => {
                    return {
                        "name": `Book ${book.title}`,
                        "sku": book.id,
                        "price": book.price,
                        "currency": "USD",
                        "quantity": 1
                    }
                })
            },
            "amount": {
                "currency": "USD",
                "total": req.body.total
            },
            "description": "You are paying for all chosen books right now!"
        }]
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            console.log(error)
            throw error;
        } else {
            res.send(payment.links[1].href)
        }
    });
})

router.post('/paypalSuccess', (req, res) => {
    const execute_payment_json = {
        "payer_id": req.query.PayerID,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": total
            }
        }]
    };
    const paymentId = req.query.paymentId;
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            res.send('Payment accepted!')
        }
    });
})

router.post('/paypalCancel', (req, res) => {
    res.send('Payment cancelled!')
})

module.exports = router;