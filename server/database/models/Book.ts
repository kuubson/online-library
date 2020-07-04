import { Model, DataType, Table, Column, BelongsToMany } from 'sequelize-typescript'
import { BelongsToManyGetAssociationsMixin } from 'sequelize'

import User from './User'
import Register from './Register'

@Table({})
export default class Book extends Model<User> {
    public getUsers: BelongsToManyGetAssociationsMixin<User>
    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    title: string
    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    author: string
    @Column({
        allowNull: false,
        type: DataType.TEXT
    })
    cover: string
    @Column({
        type: DataType.TEXT
    })
    price: string
    @BelongsToMany(() => User, () => Register)
    users: User[]
}
