import {
    Model,
    DataType,
    Table,
    Column,
    HasOne,
    BelongsToMany,
    BeforeCreate
} from 'sequelize-typescript'
import { HasOneCreateAssociationMixin } from 'sequelize'
import bcrypt from 'bcrypt'

import Authentication from './Authentication'
import Register from './Register'
import Book from './Book'

@Table({})
export default class User extends Model<User> {
    public createAuthentication: HasOneCreateAssociationMixin<Authentication>
    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    name: string
    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    email: string
    @Column({
        allowNull: false,
        type: DataType.TEXT
    })
    password: string
    @Column({
        type: DataType.TEXT
    })
    passwordToken: string
    @HasOne(() => Authentication)
    authentication: Authentication
    @BelongsToMany(() => Book, () => Register)
    books: Book[]
    @BeforeCreate
    static hashPassword(user: User) {
        user.password = bcrypt.hashSync(user.password, 11)
    }
}
