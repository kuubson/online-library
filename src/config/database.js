module.exports = (mongoose) => {
    const login = process.env.DB_LOGIN;
    const password = process.env.DB_PASSWORD;
    const database = `mongodb+srv://${login}:${password}@database-mzdui.mongodb.net/online-library?retryWrites=true`
    try {
        mongoose.connect(database, { useNewUrlParser: true }).then(() => console.log("Successfully connected to database!"));
    } catch (error) {
        console.log("Something went wrong! " + error);
    }
}