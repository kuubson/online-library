import { Request } from 'express'

export default (req: Request) => {
    const production = process.env.NODE_ENV === 'production'
    return `${production ? 'https' : 'http'}://${
        production ? req.hostname : `${req.hostname}:3000`
    }`
}
