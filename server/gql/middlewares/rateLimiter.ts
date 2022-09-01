import { createRateLimitRule } from 'graphql-rate-limit'

import { ApiError } from 'utils'

export const rateLimiter = createRateLimitRule({
   identifyContext: ({ id }) => id,
   createError: () =>
      new ApiError(
         'Too many requests',
         'You have exceeded max amount of requests, try again later',
         429
      ),
})({
   window: '5m',
   max: 10,
})
