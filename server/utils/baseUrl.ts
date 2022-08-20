import { Request } from 'express'

import { NODE_ENV } from 'config'

export const baseUrl = (req: Request) =>
   NODE_ENV === 'production' ? `${req.protocol}://${req.get('host')}` : 'http://localhost:3000'
