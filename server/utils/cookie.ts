import { NODE_ENV } from 'config'

const cookieMaxAge = 7 * 24 * 60 * 60 * 1000 // 7 days

export const getCookie = (cookiesString: string | undefined, cookieName: string) => {
   const cookies = `; ${cookiesString}`
   return cookies.split(`; ${cookieName}=`).pop()?.split(';').shift() || ''
}

export const cookie = (setMaxAge?: boolean) => ({
   secure: NODE_ENV === 'production',
   httpOnly: true,
   sameSite: true,
   ...(setMaxAge && { maxAge: cookieMaxAge }),
})
