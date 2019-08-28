require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3001

require('./server/database/database')(require('mongoose'))

app.use(require('helmet')())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

require('./server/routes/routes')(app)

app.listen(port, () => console.log(`Server started at port ${port}`))