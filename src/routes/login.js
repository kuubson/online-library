const router = require('express').Router();
const validator = require('validator');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {

    const { email, password } = req.body;

    const savedEmail = email;
    const savedPassword = password;
    const checkedEmail = validator.blacklist(email, `$`);
    const checkedPassword = validator.blacklist(password, '$');

    if (!validator.equals(checkedEmail, savedEmail) && !validator.equals(checkedPassword, savedPassword)) {
        res.send({
            done: false,
            msg: 'You put forbidden chars in the inputs!'
        })
    } else {
        User.findOne({
            email: checkedEmail
        }).then(user => {
            if (!user) {
                res.send({
                    done: false,
                    msg: 'This email is not registered!'
                })
            } else {
                const userPassword = user.password;
                bcrypt.compare(checkedPassword, userPassword, (error, validated) => {
                    if (error) {
                        res.send({
                            done: false,
                            msg: 'Something went wrong! Try again!'
                        })
                    }
                    if (!validated) {
                        res.send({
                            done: false,
                            msg: 'Bad password! Try again!'
                        })
                    } else {
                        const payload = { id: user._id, email: user.email };
                        const token = jwt.sign(payload, process.env.SECRET_OR_KEY)
                        res.send({
                            done: true,
                            msg: 'Succesfully logged in!',
                            token
                        })
                    }
                })
            }
        })
    }
})

module.exports = router;