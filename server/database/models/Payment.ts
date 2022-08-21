import type {
   Association,
   BelongsToCreateAssociationMixin,
   BelongsToGetAssociationMixin,
   BelongsToSetAssociationMixin,
   CreationOptional,
   InferAttributes,
   InferCreationAttributes,
   NonAttribute,
   Sequelize,
} from 'sequelize'
import { DataTypes, Model } from 'sequelize'

import { dbDefaultAttributes } from 'utils'

import type { User } from './User'

export class Payment extends Model<InferAttributes<Payment>, InferCreationAttributes<Payment>> {
   declare id: CreationOptional<number>
   declare createdAt: CreationOptional<Date>
   declare updatedAt: CreationOptional<Date>

   declare paymentId: string
   declare products: string
   declare approved: boolean | null

   declare user?: NonAttribute<User>
   declare getUser: BelongsToGetAssociationMixin<User>
   declare setUser: BelongsToSetAssociationMixin<User, User['id']>
   declare createUser: BelongsToCreateAssociationMixin<User>

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
