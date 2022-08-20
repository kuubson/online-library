import {
   Association,
   CreationOptional,
   DataTypes,
   InferAttributes,
   InferCreationAttributes,
   Model,
   NonAttribute,
   Sequelize,
} from 'sequelize'

import { dbDefaultAttributes } from 'utils'

import { User } from './User'

export class Payment extends Model<InferAttributes<Payment>, InferCreationAttributes<Payment>> {
   declare id: CreationOptional<number>
   declare createdAt: CreationOptional<Date>
   declare updatedAt: CreationOptional<Date>

   declare paymentId: 'MESSAGE' | 'IMAGE' | 'VIDEO' | 'FILE'
   declare products: string
   declare approved: boolean

   declare user?: NonAttribute<User>

   declare static associations: {
      user: Association<Payment, User>
   }
}

export const PaymentModel = (sequelize: Sequelize) =>
   Payment.init(
      {
         ...dbDefaultAttributes,
         paymentId: {
            type: DataTypes.TEXT,
            allowNull: false,
         },
         products: {
            type: DataTypes.TEXT,
            allowNull: false,
         },
         approved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
         },
      },
      {
         sequelize,
         modelName: 'payment',
      }
   )
