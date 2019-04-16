require('dotenv').config();
const port = process.env.PORT || 3001;
const express = require('express');
const app = express();

const helmet = require('helmet');

const mongoose = require('mongoose');
require('./config/db-connection')(mongoose);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', require('./routes/register'));

app.listen(port, console.log(`Server started at port ${port}`));