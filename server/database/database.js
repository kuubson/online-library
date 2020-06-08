import { Sequelize } from 'sequelize'

const { DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST } = process.env

const connection = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
    host: DATABASE_HOST,
    dialect: 'mysql',
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    }
})

const User = connection.import('./models/User')

const initializeDatabaseConnection = async () => {
    try {
        // await connection.sync({ force: true })
        // await connection.sync({ alter: true })
        await connection.sync()
        console.log('Successfully connected to the database.')
    } catch (error) {
        console.log({
            error,
            message: 'There was a problem connecting to the database'
        })
    }
}
initializeDatabaseConnection()

export { connection as Connection, User }
