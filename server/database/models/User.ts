import bcrypt from 'bcrypt'
import type {
   Association,
   BelongsToCreateAssociationMixin,
   BelongsToGetAssociationMixin,
   BelongsToManyAddAssociationMixin,
   BelongsToManyAddAssociationsMixin,
   BelongsToManyCountAssociationsMixin,
   BelongsToManyCreateAssociationMixin,
   BelongsToManyGetAssociationsMixin,
   BelongsToManyHasAssociationMixin,
   BelongsToManyHasAssociationsMixin,
   BelongsToManyRemoveAssociationMixin,
   BelongsToManyRemoveAssociationsMixin,
   BelongsToManySetAssociationsMixin,
   BelongsToSetAssociationMixin,
   CreationOptional,
   HasManyAddAssociationMixin,
   HasManyAddAssociationsMixin,
   HasManyCountAssociationsMixin,
   HasManyCreateAssociationMixin,
   HasManyGetAssociationsMixin,
   HasManyHasAssociationMixin,
   HasManyHasAssociationsMixin,
   HasManyRemoveAssociationMixin,
   HasManyRemoveAssociationsMixin,
   HasManySetAssociationsMixin,
   InferAttributes,
   InferCreationAttributes,
   NonAttribute,
   Sequelize,
} from 'sequelize'
import { Model, STRING, TEXT } from 'sequelize'

import { dbDefaultAttributes } from 'utils'

import type { Authentication } from './Authentication'
import type { Book } from './Book'
import type { Message } from './Message'
import type { Payment } from './Payment'
import type { Subscription } from './Subscription'

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
   declare id: CreationOptional<number>
   declare createdAt: CreationOptional<Date>
   declare updatedAt: CreationOptional<Date>

   declare name: string
   declare email: string
   declare password: string
   declare passwordToken: string | null

   declare authentication?: NonAttribute<Authentication>
   declare getAuthentication: BelongsToGetAssociationMixin<Authentication>
   declare setAuthentication: BelongsToSetAssociationMixin<Authentication, Authentication['id']>
   declare createAuthentication: BelongsToCreateAssociationMixin<Authentication>

   declare books?: NonAttribute<Book[]>
   declare getBooks: BelongsToManyGetAssociationsMixin<Book>
   declare setBooks: BelongsToManySetAssociationsMixin<Book, Book['id']>
   declare addBook: BelongsToManyAddAssociationMixin<Book, Book['id']>
   declare addBooks: BelongsToManyAddAssociationsMixin<Book, Book['id']>
   declare createBook: BelongsToManyCreateAssociationMixin<Book>
   declare removeBook: BelongsToManyRemoveAssociationMixin<Book, Book['id']>
   declare removeBooks: BelongsToManyRemoveAssociationsMixin<Book, Book['id']>
   declare hasBook: BelongsToManyHasAssociationMixin<Book, Book['id']>
   declare hasBooks: BelongsToManyHasAssociationsMixin<Book, Book['id']>
   declare countBooks: BelongsToManyCountAssociationsMixin

   declare messages?: NonAttribute<Message[]>
   declare getMessages: HasManyGetAssociationsMixin<Message>
   declare setMessages: HasManySetAssociationsMixin<Message, Message['id']>
   declare addMessage: HasManyAddAssociationMixin<Message, Message['id']>
   declare addMessages: HasManyAddAssociationsMixin<Message, Message['id']>
   declare createMessage: HasManyCreateAssociationMixin<Message>
   declare removeMessage: HasManyRemoveAssociationMixin<Message, Message['id']>
   declare removeMessages: HasManyRemoveAssociationsMixin<Message, Message['id']>
   declare hasMessage: HasManyHasAssociationMixin<Message, Message['id']>
   declare hasMessages: HasManyHasAssociationsMixin<Message, Message['id']>
   declare countMessages: HasManyCountAssociationsMixin

   declare payments?: NonAttribute<Payment[]>
   declare getPayments: HasManyGetAssociationsMixin<Payment>
   declare setPayments: HasManySetAssociationsMixin<Payment, Payment['id']>
   declare addPayment: HasManyAddAssociationMixin<Payment, Payment['id']>
   declare addPayments: HasManyAddAssociationsMixin<Payment, Payment['id']>
   declare createPayment: HasManyCreateAssociationMixin<Payment>
   declare removePayment: HasManyRemoveAssociationMixin<Payment, Payment['id']>
   declare removePayments: HasManyRemoveAssociationsMixin<Payment, Payment['id']>
   declare hasPayment: HasManyHasAssociationMixin<Payment, Payment['id']>
   declare hasPayments: HasManyHasAssociationsMixin<Payment, Payment['id']>
   declare countPayments: HasManyCountAssociationsMixin

   declare subscriptions?: NonAttribute<Subscription[]>
   declare getSubscriptions: HasManyGetAssociationsMixin<Subscription>
   declare setSubscriptions: HasManySetAssociationsMixin<Subscription, Subscription['id']>
   declare addSubscription: HasManyAddAssociationMixin<Subscription, Subscription['id']>
   declare addSubscriptions: HasManyAddAssociationsMixin<Subscription, Subscription['id']>
   declare createSubscription: HasManyCreateAssociationMixin<Subscription>
   declare removeSubscription: HasManyRemoveAssociationMixin<Subscription, Subscription['id']>
   declare removeSubscriptions: HasManyRemoveAssociationsMixin<Subscription, Subscription['id']>
   declare hasSubscription: HasManyHasAssociationMixin<Subscription, Subscription['id']>
   declare hasSubscriptions: HasManyHasAssociationsMixin<Subscription, Subscription['id']>
   declare countSubscriptions: HasManyCountAssociationsMixin

   declare static associations: {
      authentication: Association<User, Authentication>
      books: Association<User, Book>
      messages: Association<User, Message>
      payments: Association<User, Payment>
      subscriptions: Association<User, Subscription>
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
