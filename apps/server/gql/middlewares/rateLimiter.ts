import { createRateLimitRule } from 'graphql-rate-limit'

import {
   RATE_LIMITER_MAX_CALLS,
   RATE_LIMITER_WINDOW_MS,
   RateLimitError,
} from '@online-library/config'

export const rateLimiter = createRateLimitRule({
   identifyContext: ({ id }) => id,
   createError: () => RateLimitError,
})({
   window: `${RATE_LIMITER_WINDOW_MS}ms`,
   max: RATE_LIMITER_MAX_CALLS,
})
