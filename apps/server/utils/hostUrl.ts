import type { Request } from 'express'

import { NODE_ENV } from 'config'

export const hostUrl = (req: Request) =>
   NODE_ENV === 'production' ? `${req.protocol}://${req.get('host')}` : 'http://localhost:3000'