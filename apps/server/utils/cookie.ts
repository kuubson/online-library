import { COOKIE_MAX_AGE, isProd } from '@online-library/config'

export const cookie = (setMaxAge?: boolean) => ({
   secure: isProd,
   httpOnly: true,
   sameSite: true,
   ...(setMaxAge && { maxAge: COOKIE_MAX_AGE }),
})
