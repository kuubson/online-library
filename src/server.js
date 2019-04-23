require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const mongoose = require('mongoose');
require('./config/database')(mongoose);

const helmet = require('helmet');
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', require('./routes/register'));
app.use('/', require('./routes/login'));

app.listen(port, () => console.log(`Successfully started server at port ${port}!`));