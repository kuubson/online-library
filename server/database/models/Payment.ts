import { Sequelize, Model, TEXT, BOOLEAN } from 'sequelize'

class PaymentValues extends Model {
    id: number
    paymentId: string
    products: string
    isApproved: boolean
}

export class Payment extends PaymentValues {
    dataValues: PaymentValues
}

const PaymentModel = (sequelize: Sequelize) => {
    Payment.init(
        {
            paymentId: {
                type: TEXT,
                allowNull: false
            },
            products: {
                type: TEXT,
                allowNull: false
            },
            isApproved: {
                type: BOOLEAN,
                defaultValue: false
            }
        },
        {
            sequelize,
            modelName: 'payment'
        }
    )
    return Payment
}

export default PaymentModel
