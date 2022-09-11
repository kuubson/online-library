import limiter from 'express-rate-limit'

import { RateLimitError } from '@online-library/tools'

export const rateLimiter = () =>
   limiter({
      windowMs: 5 * 60 * 1000, // 5 min
      max: 10,
      handler: (_, res) => res.status(RateLimitError.status).send(RateLimitError),
   })
