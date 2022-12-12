import type { Sequelize } from 'sequelize'
import type { AutoOptions } from 'sequelize-auto'
import SequelizeAuto from 'sequelize-auto'

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
   await new SequelizeAuto(connection, '', '', sequelizeAutoConfig).run()
   console.log('✔️ Database types generated')
}
