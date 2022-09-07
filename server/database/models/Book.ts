import type {
   Association,
   CreationOptional,
   InferAttributes,
   InferCreationAttributes,
   Sequelize,
} from 'sequelize'
import { DataTypes, Model } from 'sequelize'

import { dbDefaultAttributes } from 'utils'

import type { User } from './User'

export class Book extends Model<InferAttributes<Book>, InferCreationAttributes<Book>> {
   declare id: CreationOptional<number>
   declare createdAt: CreationOptional<Date>
   declare updatedAt: CreationOptional<Date>

   declare title: string
   declare author: string
   declare cover: string
   declare price: number | null

   declare static associations: {
      user: Association<Book, User>
   }
}

export const BookModel = (sequelize: Sequelize) =>
   Book.init(
      {
         ...dbDefaultAttributes,
         title: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         author: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         cover: {
            type: DataTypes.TEXT,
            allowNull: false,
         },
         price: { type: DataTypes.FLOAT },
      },
      {
         sequelize,
         modelName: 'book',
      }
   )
