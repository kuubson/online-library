const maxAge = 7 * 24 * 60 * 60 * 1000 // 7 days

const getCookie = (cookiesString: string | undefined, cookieName: string) => {
    const cookies = `; ${cookiesString}`
    return cookies.split(`; ${cookieName}=`).pop()!.split(';').shift()
}

export const cookie = {
    maxAge,
    getCookie
}
