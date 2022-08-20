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

export class Authentication extends Model<
   InferAttributes<Authentication>,
   InferCreationAttributes<Authentication>
> {
   declare id: CreationOptional<number>
   declare createdAt: CreationOptional<Date>
   declare updatedAt: CreationOptional<Date>

   declare token: string
   declare authenticated: boolean | null

   declare user?: NonAttribute<User>

   declare static associations: {
      user: Association<Authentication, User>
   }
}

export const AuthenticationModel = (sequelize: Sequelize) =>
   Authentication.init(
      {
         ...dbDefaultAttributes,
         token: {
            type: DataTypes.TEXT,
            allowNull: false,
         },
         authenticated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
         },
      },
      {
         sequelize,
         modelName: 'authentication',
      }
   )
