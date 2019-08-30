module.exports = app => {
    app.use('/', require('./login'))
    app.use('/', require('./register'))
    app.use('/', require('./uploadBook'))
    app.use('/', require('./getBooks'))
    app.use('/', require('./borrowBook'))
    app.use('/', require('./findBook'))
}