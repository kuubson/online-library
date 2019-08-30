module.exports = app => {
    app.use('/', require('./login'))
    app.use('/', require('./register'))
    app.use('/', require('./uploadBook'))
}