import { Model, DataType, Table, Column, HasOne, BeforeCreate } from 'sequelize-typescript'
import { HasOneCreateAssociationMixin } from 'sequelize'
import bcrypt from 'bcrypt'

import Authentication from './Authentication'

@Table({
    tableName: 'users'
})
export default class User extends Model<User> {
    public createAuthentication!: HasOneCreateAssociationMixin<Authentication>
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
    @HasOne(() => Authentication)
    authentication: Authentication
    @BeforeCreate
    static hashPassword(user: User) {
        user.password = bcrypt.hashSync(user.password, 11)
    }
}
