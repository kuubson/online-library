require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3001

require('./server/database/database')(require('mongoose'))
require('./server/passport/passport')(require('passport'))

app.use(require('helmet')())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(require('cookie-parser')())
app.use(require('passport').initialize())

require('./server/routes/routes')(app)

app.listen(port, () => console.log(`Server started at port ${port}`))