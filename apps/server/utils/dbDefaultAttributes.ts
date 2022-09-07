import { DataTypes } from 'sequelize'

export const dbDefaultAttributes = {
   id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
   },
   createdAt: DataTypes.DATE,
   updatedAt: DataTypes.DATE,
}
