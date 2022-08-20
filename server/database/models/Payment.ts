import { BOOLEAN, Model, Sequelize, TEXT } from 'sequelize'

class PaymentValues extends Model {
   id: number
   paymentId: string
   products: string
   approved: boolean
}

export class Payment extends PaymentValues {
   dataValues: PaymentValues
}

const PaymentModel = (sequelize: Sequelize) => {
   Payment.init(
      {
         paymentId: {
            type: TEXT,
            allowNull: false,
         },
         products: {
            type: TEXT,
            allowNull: false,
         },
         approved: {
            type: BOOLEAN,
            defaultValue: false,
         },
      },
      {
         sequelize,
         modelName: 'payment',
      }
   )
   return Payment
}

export default PaymentModel
