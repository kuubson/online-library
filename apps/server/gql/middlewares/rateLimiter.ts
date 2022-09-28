import { createRateLimitRule } from 'graphql-rate-limit'

import { RateLimitError } from '@online-library/config'

export const rateLimiter = createRateLimitRule({
   identifyContext: ({ id }) => id,
   createError: () => RateLimitError,
})({
   window: '5m',
   max: 10,
})
