import { Model, DataType, Table, Column, ForeignKey, BelongsTo } from 'sequelize-typescript'

import User from './User'

@Table({
    tableName: 'authentications'
})
export default class Authentication extends Model<Authentication> {
    @Column({
        allowNull: false,
        type: DataType.TEXT
    })
    token: string
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    isAuthenticated: boolean
    @BelongsTo(() => User)
    user: User
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    userId: number
}
