import { Model, DataType, Table, Column, BeforeCreate } from 'sequelize-typescript'
import bcrypt from 'bcrypt'

@Table({
    tableName: 'users'
})
export default class User extends Model<User> {
    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    email!: string
    @Column({
        allowNull: false,
        type: DataType.TEXT
    })
    password!: string
    @BeforeCreate
    static hashPassword(user: User) {
        user.password = bcrypt.hashSync(user.password, 11)
    }
}
