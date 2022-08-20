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

export class Message extends Model<InferAttributes<Message>, InferCreationAttributes<Message>> {
   declare id: CreationOptional<number>
   declare createdAt: CreationOptional<Date>
   declare updatedAt: CreationOptional<Date>

   declare type: 'MESSAGE' | 'IMAGE' | 'VIDEO' | 'FILE'
   declare content: string
   declare filename: string
   declare readBy: string
   declare cloudinaryId: string

   declare user?: NonAttribute<User>

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
