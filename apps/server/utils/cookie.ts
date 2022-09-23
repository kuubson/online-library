import { COOKIE_MAX_AGE } from '@online-library/config'

import { NODE_ENV } from 'config'

export const cookie = (setMaxAge?: boolean) => ({
   secure: NODE_ENV === 'production',
   httpOnly: true,
   sameSite: true,
   ...(setMaxAge && { maxAge: COOKIE_MAX_AGE }),
})
