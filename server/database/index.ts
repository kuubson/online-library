import { Sequelize } from 'sequelize'

import { NODE_ENV, SEED_BOOKS, SEQUELIZE_AUTO, db, generateDbTypes } from 'config'

import { AuthenticationModel } from './models/Authentication'
import { BookModel } from './models/Book'
import { MessageModel } from './models/Message'
import { PaymentModel } from './models/Payment'
import { SubscriptionModel } from './models/Subscription'
import { UserModel } from './models/User'
import { seedBooks } from './seeds'

const connection = new Sequelize(...db)

export const User = UserModel(connection)
export const Authentication = AuthenticationModel(connection)
export const Book = BookModel(connection)
export const Message = MessageModel(connection)
export const Payment = PaymentModel(connection)
export const Subscription = SubscriptionModel(connection)

User.hasOne(Authentication)
Authentication.belongsTo(User)

User.belongsToMany(Book, { through: 'register' })
Book.belongsToMany(User, { through: 'register' })

User.hasMany(Message)
Message.belongsTo(User)

User.hasMany(Payment)
Payment.belongsTo(User)

User.hasMany(Subscription)
Subscription.belongsTo(User)

const initializeDatabase = async () => {
   try {
      // await connection.sync({ force: true })
      // await connection.sync({ alter: true })
      await connection.sync()

      console.log('📁 Database connected')

      if (NODE_ENV === 'development') {
         if (SEED_BOOKS === true) {
            seedBooks()
         }
         if (SEQUELIZE_AUTO === true) {
            generateDbTypes(connection)
         }
      }
   } catch (error) {
      console.log({
         error,
         message: 'There was a problem connecting to the database',
      })
   }
}
initializeDatabase()

export { connection as Connection }
