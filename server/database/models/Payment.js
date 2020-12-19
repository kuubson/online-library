import { Model, TEXT, BOOLEAN } from 'sequelize'

export default sequelize => {
    class Payment extends Model {}
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
