import { Sequelize } from 'sequelize-typescript'

import User from './models/User'
import Authentication from './models/Authentication'
import Register from './models/Register'
import Book from './models/Book'

const { DATABASE_HOST, DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD } = process.env

declare module 'express' {
    interface Request {
        user: User
    }
}

const connection = new Sequelize({
    host: DATABASE_HOST,
    database: DATABASE_NAME,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    dialect: 'mysql',
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    }
})

connection.addModels([User, Authentication, Register, Book])

const init = async () => {
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
init()

export { connection as Connection, User, Authentication, Register, Book }
