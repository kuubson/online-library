import { Model, DataType, Table, Column, ForeignKey, BelongsTo } from 'sequelize-typescript'

import User from './User'

@Table({})
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
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    userId: number
    @BelongsTo(() => User)
    user: User
}
