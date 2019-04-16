module.exports = (mongoose) => {
    const login = process.env.DB_LOGIN;
    const password = process.env.DB_PASSWORD;
    mongoose.connect(`mongodb+srv://${login}:${password}@database-mzdui.mongodb.net/online-library?retryWrites=true`, { useNewUrlParser: true })
}