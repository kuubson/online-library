import type {
   CreationOptional,
   InferAttributes,
   InferCreationAttributes,
   Sequelize,
} from 'sequelize'
import { DataTypes, Model } from 'sequelize'

import { dbDefaultAttributes } from 'utils'

export class EtherealEmail extends Model<
   InferAttributes<EtherealEmail>,
   InferCreationAttributes<EtherealEmail>
> {
   declare id: CreationOptional<number>
   declare createdAt: CreationOptional<Date>
   declare updatedAt: CreationOptional<Date>

   declare url: string
}

export const EtherealEmailModel = (sequelize: Sequelize) =>
   EtherealEmail.init(
      {
         ...dbDefaultAttributes,
         url: {
            type: DataTypes.STRING,
            allowNull: false,
         },
      },
      {
         sequelize,
         modelName: 'etherealEmail',
      }
   )
