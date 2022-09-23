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

import type { messageTypes } from '@online-library/tools'

import { dbDefaultAttributes } from 'utils'

import type { User } from './User'

export class Message extends Model<InferAttributes<Message>, InferCreationAttributes<Message>> {
   declare id: CreationOptional<number>
   declare createdAt: CreationOptional<Date>
   declare updatedAt: CreationOptional<Date>

   declare type: typeof messageTypes[number]
   declare content: string
   declare filename: string | null
   declare readBy: string
   declare cloudinaryId: string | null

   declare user?: NonAttribute<User>
   declare getUser: BelongsToGetAssociationMixin<User>
   declare setUser: BelongsToSetAssociationMixin<User, User['id']>
   declare createUser: BelongsToCreateAssociationMixin<User>

   declare static associations: {
      user: Association<Message, User>
   }
}

export const MessageModel = (sequelize: Sequelize) =>
   Message.init(
      {
         ...dbDefaultAttributes,
         type: {
            type: DataTypes.ENUM('MESSAGE', 'IMAGE', 'VIDEO', 'FILE'),
            allowNull: false,
         },
         content: {
            type: DataTypes.TEXT,
            allowNull: false,
         },
         filename: {
            type: DataTypes.TEXT,
            defaultValue: '',
         },
         readBy: {
            type: DataTypes.TEXT,
            defaultValue: '',
         },
         cloudinaryId: { type: DataTypes.TEXT },
      },
      {
         sequelize,
         modelName: 'message',
      }
   )
