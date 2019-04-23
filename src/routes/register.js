const router = require('express').Router();
const bcrypt = require('bcrypt');
const validator = require('validator');
const User = require('../models/User');

router.post('/register', (req, res) => {

    const { name, surname, email, password } = req.body;

    const savedName = name;
    const savedSurame = surname;
    const savedEmail = email;
    const savedPassword = password;
    const checkedName = validator.blacklist(name, `!@#$%^&*()_+;',./{}:"<>?|~`);
    const checkedSurname = validator.blacklist(surname, `!@#$%^&*()_+;',./{}:"<>?|~`);
    const checkedEmail = validator.blacklist(email, '$');
    const checkedPassword = validator.blacklist(password, '$');

    if (!validator.equals(checkedName, savedName) || !validator.equals(checkedSurname, savedSurame) || !validator.equals(checkedEmail, savedEmail) || !validator.equals(checkedPassword, savedPassword)) {
        res.send({
            done: false,
            msg: 'You put forbidden chars in the inputs!'
        })
    } else {
        User.findOne({
            email: checkedEmail
        }).then(user => {
            if (user) {
                res.send({
                    done: false,
                    msg: 'User with this email is already registered!'
                })
            } else {
                bcrypt.genSalt(10, (error, salt) => {
                    if (error) {
                        res.send({
                            done: false,
                            msg: 'Something went wrong! Try again!'
                        })
                    }
                    bcrypt.hash(checkedPassword, salt, (error, hash) => {
                        if (error) {
                            res.send({
                                done: false,
                                msg: 'Something went wrong! Try again!'
                            })
                        }
                        const newUser = new User({
                            name,
                            surname,
                            email,
                            password: hash,
                            books: []
                        })
                        newUser.save().then(res.send({
                            done: true,
                            msg: 'Account created!'
                        })).catch(error => res.send({
                            done: false,
                            msg: 'Something went wrong! Try again!'
                        }));
                    })
                })
            }
        })
    }

});

module.exports = router;