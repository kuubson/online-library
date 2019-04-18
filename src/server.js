require('dotenv').config();

const path = require('path');

const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const mongoose = require('mongoose');
require('./config/db-connection')(mongoose);

const passport = require('passport');
require('./config/passport')(passport);

const helmet = require('helmet');
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', require('./routes/register'));
app.use('/', require('./routes/login'));
app.use('/', require('./routes/getBook'));
app.use('/', require('./routes/getBooks'));

app.use('/books', express.static(path.join(__dirname, './img/books')));

app.listen(port, console.log(`Server started at port ${port}`));