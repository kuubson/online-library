import bcrypt from 'bcrypt'
import {
   Association,
   CreationOptional,
   InferAttributes,
   InferCreationAttributes,
   Model,
   NonAttribute,
   STRING,
   Sequelize,
   TEXT,
} from 'sequelize'

import { dbDefaultAttributes } from 'utils'

import { Authentication } from './Authentication'
import { Book } from './Book'
import { Message } from './Message'
import { Payment } from './Payment'
import { Subscription } from './Subscription'

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
   declare id: CreationOptional<number>
   declare createdAt: CreationOptional<Date>
   declare updatedAt: CreationOptional<Date>

   declare name: string
   declare email: string
   declare password: string
   declare passwordToken: string | null

   declare authentication?: NonAttribute<Authentication>
   declare subscriptions?: NonAttribute<Subscription[]>

   createAuthentication: (parameters: object, options?: object) => Promise<Authentication>

   createSubscription: (parameters: object, options?: object) => Promise<Subscription>
   getSubscriptions: (parameters?: object) => Promise<Subscription[]>

   addBook: (book: Book | null, options?: object) => Promise<void>
   getBooks: (parameters?: object) => Promise<Book[]>
   hasBook: (book: Book | null, options?: object) => Promise<boolean>

   createMessage: (parameters: object, options?: object) => Promise<Message>

   createPayment: (parameters: object, options?: object) => Promise<Payment>
   getPayments: (parameters?: object) => Promise<Payment[]>

   declare static associations: {
      authentication: Association<User, Authentication>
      book: Association<User, Book>
      message: Association<User, Message>
      payment: Association<User, Payment>
      subscription: Association<User, Subscription>
   }
}

export const UserModel = (sequelize: Sequelize) =>
   User.init(
      {
         ...dbDefaultAttributes,
         name: {
            type: STRING,
            allowNull: false,
         },
         email: {
            type: STRING,
            allowNull: false,
         },
         password: {
            type: TEXT,
            allowNull: false,
         },
         passwordToken: { type: TEXT },
      },
      {
         sequelize,
         modelName: 'user',
         hooks: {
            beforeCreate: (user: User) => {
               user.password = bcrypt.hashSync(user.password, 11)
            },
         },
      }
   )
