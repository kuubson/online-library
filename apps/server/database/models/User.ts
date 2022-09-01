import { Sequelize, Model, STRING, TEXT } from 'sequelize'
import bcrypt from 'bcrypt'

import { Authentication } from './Authentication'
import { Book } from './Book'
import { Message } from './Message'
import { Payment } from './Payment'
import { Subscription } from './Subscription'

class UserValues extends Model {
    id: number
    name: string
    email: string
    password: string
    passwordToken: string
}

class UserAssociations extends UserValues {
    authentication: Authentication

    subscriptions: Subscription[]
    createSubscription: (parameters: object, options?: object) => Promise<Subscription>
    getSubscriptions: (parameters?: object) => Promise<Subscription[]>

    addBook: (book: Book | null, options?: object) => Promise<void>
    getBooks: (parameters?: object) => Promise<Book[]>
    hasBook: (book: Book | null, options?: object) => Promise<boolean>

    createMessage: (parameters: object, options?: object) => Promise<Message>

    createPayment: (parameters: object, options?: object) => Promise<Payment>
    getPayments: (parameters?: object) => Promise<Payment[]>
}

export class User extends UserAssociations {
    dataValues: UserValues
}

const UserModel = (sequelize: Sequelize) => {
    User.init(
        {
            name: {
                type: STRING,
                allowNull: false
            },
            email: {
                type: STRING,
                allowNull: false
            },
            password: {
                type: TEXT,
                allowNull: false
            },
            passwordToken: {
                type: TEXT
            }
        },
        {
            sequelize,
            modelName: 'user',
            hooks: {
                beforeCreate: (user: User) => {
                    user.password = bcrypt.hashSync(user.password, 11)
                }
            }
        }
    )
    return User
}

export default UserModel
