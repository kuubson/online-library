import { Request } from 'express'

export const baseUrl = (req: Request) =>
   process.env.NODE_ENV === 'production'
      ? `${req.protocol}://${req.get('host')}`
      : 'http://localhost:3000'
