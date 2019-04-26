require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const path = require('path');

const mongoose = require('mongoose');
require('./config/database')(mongoose);

const passport = require('passport');
require('./config/passport')(passport);

const helmet = require('helmet');
app.use(helmet());

app.use(passport.initialize());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: false }));
app.use('/', require('./routes/register'));
app.use('/', require('./routes/login'));
app.use('/', require('./routes/getFreeBooks'));
app.use('/', require('./routes/getPaidBooks'));
app.use('/', require('./routes/findNewBook'));
app.use('/', require('./routes/borrowBook'));
app.use('/', require('./routes/buyBook'));
app.use('/', require('./routes/getBorrowedBooks'));
app.use('/', require('./routes/getBoughtBooks'));

app.use(express.static(path.resolve(__dirname, '../build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(port, () => console.log(`Successfully started server at port ${port}!`));