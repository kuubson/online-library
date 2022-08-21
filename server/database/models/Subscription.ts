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

export class Subscription extends Model<
   InferAttributes<Subscription>,
   InferCreationAttributes<Subscription>
> {
   declare id: CreationOptional<number>
   declare createdAt: CreationOptional<Date>
   declare updatedAt: CreationOptional<Date>

   declare endpoint: string
   declare p256dh: string
   declare auth: string

   declare user?: NonAttribute<User>
   declare getUser: BelongsToGetAssociationMixin<User>
   declare setUser: BelongsToSetAssociationMixin<User, User['id']>
   declare createUser: BelongsToCreateAssociationMixin<User>

   declare static associations: {
      user: Association<Subscription, User>
   }
}

export const SubscriptionModel = (sequelize: Sequelize) =>
   Subscription.init(
      {
         ...dbDefaultAttributes,
         endpoint: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         p256dh: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         auth: {
            type: DataTypes.STRING,
            allowNull: false,
         },
      },
      {
         sequelize,
         modelName: 'subscription',
      }
   )
