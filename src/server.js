require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const path = require('path')

require('./server/database/database')(require('mongoose'))
require('./server/passport/passport')(require('passport'))

app.use(require('helmet')())
app.use(express.json({ limit: '25mb' }))
app.use(express.urlencoded({ extended: false, limit: '25mb' }))
app.use(require('cookie-parser')())
app.use(require('passport').initialize())

require('./server/routes/routes')(app)

app.use(express.static(path.resolve(__dirname, '../build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(port, () => console.log(`Server started at port ${port}`))