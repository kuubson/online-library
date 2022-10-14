import type { Sequelize } from 'sequelize'
import type { AutoOptions } from 'sequelize-auto'
import SequelizeAuto from 'sequelize-auto'

import { DATABASE_PASSWORD, DATABASE_USERNAME } from 'config'

const sequelizeAutoConfig: AutoOptions = {
   directory: './database/generated',
   noInitModels: true,
   useDefine: false,
   singularize: true,
   lang: 'ts',
   caseFile: 'p',
   caseModel: 'p',
   caseProp: 'c',
}

export const sequelizeAuto = async (connection: Sequelize) => {
   await new SequelizeAuto(
      connection,
      DATABASE_USERNAME,
      DATABASE_PASSWORD,
      sequelizeAutoConfig
   ).run()
   console.log('✔️ Database types generated')
}
