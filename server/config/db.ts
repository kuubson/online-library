import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_USERNAME } from './env'

export const db = [
   DATABASE_NAME,
   DATABASE_USERNAME,
   DATABASE_PASSWORD,
   {
      host: DATABASE_HOST,
      dialect: 'postgres',
      dialectOptions: { ssl: { rejectUnauthorized: false } },
      define: {
         charset: 'utf8mb4',
         collate: 'utf8mb4_unicode_ci',
      },
      logging: false,
   },
] as const
