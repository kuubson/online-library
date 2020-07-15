import { Model, DataType, Table, Column, ForeignKey, BelongsTo } from 'sequelize-typescript'

import User from './User'

@Table({})
export default class Payment extends Model<Payment> {
    @Column({
        allowNull: false,
        type: DataType.TEXT
    })
    paymentId: string
    @Column({
        allowNull: false,
        type: DataType.TEXT
    })
    products: string
    @Column({
        defaultValue: false,
        type: DataType.BOOLEAN
    })
    isApproved: boolean
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    userId: number
    @BelongsTo(() => User)
    user: User
}
