import limiter from 'express-rate-limit'

export const rateLimiter = (request: string) =>
   limiter({
      windowMs: 30 * 60 * 1000,
      max: 10,
      handler: (_, res) => {
         const status = 429
         res.status(status).send({
            status,
            errorMessage: `You have exceeded ${request} requests. Try again later`,
         })
      },
   })
