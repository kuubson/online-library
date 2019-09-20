module.exports = app => {
    app.use('/', require('./login'))
    app.use('/', require('./register'))
    app.use('/', require('./uploadBook'))
    app.use('/', require('./getBooksForStore'))
    app.use('/', require('./getBooksForProfile'))
    app.use('/', require('./borrowBook'))
    app.use('/', require('./findBook'))
    app.use('/', require('./buyBook'))
    app.use('/', require('./suggestBook'))
}