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

export class Authentication extends Model<
   InferAttributes<Authentication>,
   InferCreationAttributes<Authentication>
> {
   declare id: CreationOptional<number>
   declare createdAt: CreationOptional<Date>
   declare updatedAt: CreationOptional<Date>

   declare activationToken: string
   declare authenticated: boolean | null

   declare user?: NonAttribute<User>
   declare getUser: BelongsToGetAssociationMixin<User>
   declare setUser: BelongsToSetAssociationMixin<User, User['id']>
   declare createUser: BelongsToCreateAssociationMixin<User>

   declare static associations: {
      user: Association<Authentication, User>
   }
}

export const AuthenticationModel = (sequelize: Sequelize) =>
   Authentication.init(
      {
         ...dbDefaultAttributes,
         activationToken: {
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
