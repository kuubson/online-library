import { NODE_ENV } from 'config'

const cookieMaxAge = 7 * 24 * 60 * 60 * 1000 // 7 days

export const cookie = (setMaxAge?: boolean) => ({
   secure: NODE_ENV === 'production',
   httpOnly: true,
   sameSite: true,
   ...(setMaxAge && { maxAge: cookieMaxAge }),
})
