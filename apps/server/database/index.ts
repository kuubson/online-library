import { Sequelize } from 'sequelize'

import { isDev } from '@online-library/config'

import { DATABASE_URL, SEED_BOOKS, SEED_USER, SEQUELIZE_AUTO, sequelizeAuto } from 'config'

import { AuthenticationModel } from './models/Authentication'
import { BookModel } from './models/Book'
import { EtherealEmailModel } from './models/EtherealEmail'
import { MessageModel } from './models/Message'
import { PaymentModel } from './models/Payment'
import { SubscriptionModel } from './models/Subscription'
import { UserModel } from './models/User'
import { seedBooks, seedUser } from './seeds'

const connection = new Sequelize(DATABASE_URL, {
   logging: false,
   define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
   },
})

export const User = UserModel(connection)
export const Authentication = AuthenticationModel(connection)
export const Book = BookModel(connection)
export const Message = MessageModel(connection)
export const Payment = PaymentModel(connection)
export const Subscription = SubscriptionModel(connection)
export const EtherealEmail = EtherealEmailModel(connection)

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

      if (isDev) {
         if (SEED_BOOKS === 'true') {
            seedBooks(100)
         }
         if (SEED_USER === 'true') {
            seedUser()
         }
         if (SEQUELIZE_AUTO === 'true') {
            sequelizeAuto(connection)
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
