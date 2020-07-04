import { Model, DataType, Table, Column, ForeignKey } from 'sequelize-typescript'

import User from './User'
import Book from './Book'

@Table({
    tableName: 'register'
})
export default class Register extends Model<User> {
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    userId: number
    @ForeignKey(() => Book)
    @Column({
        type: DataType.INTEGER
    })
    bookId: number
}
