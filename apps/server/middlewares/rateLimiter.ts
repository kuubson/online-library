import limiter from 'express-rate-limit'

import { RATE_LIMITER_WINDOW_MS, RateLimitError } from '@online-library/config'

export const rateLimiter = () =>
   limiter({
      windowMs: RATE_LIMITER_WINDOW_MS,
      max: 10,
      handler: (_, res) => res.status(RateLimitError.status).send(RateLimitError),
   })
