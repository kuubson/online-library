export const getCookie = (cookiesString: string | undefined, cookieName: string) => {
   const cookies = `; ${cookiesString}`
   return cookies.split(`; ${cookieName}=`).pop()?.split(';').shift() || ''
}
