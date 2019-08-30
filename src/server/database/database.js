module.exports = mongoose => {
    const login = process.env.DB_LOGIN
    const password = process.env.DB_PASSWORD
    const database = `mongodb+srv://${login}:${password}@database-mzdui.mongodb.net/online-library?retryWrites=true&w=majority`
    try {
        mongoose.connect(database, { useNewUrlParser: true, useFindAndModify: false }).then(() => console.log("Successfully connected to the database!"));
    } catch (error) {
        console.log("Something went wrong when connecting to database! " + error);
    }
}