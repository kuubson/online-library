require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const mongoose = require('mongoose');
require('./config/database')(mongoose);

const passport = require('passport');
require('./config/passport')(passport);

const helmet = require('helmet');
app.use(helmet());

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', require('./routes/register'));
app.use('/', require('./routes/login'));
app.use('/', require('./routes/getFreeBooks'));
app.use('/', require('./routes/getPaidBooks'));
app.use('/', require('./routes/findNewBook'));

app.listen(port, () => console.log(`Successfully started server at port ${port}!`));