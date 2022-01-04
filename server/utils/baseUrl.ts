import { Request } from 'express'

const baseUrl = (req: Request) =>
    process.env.NODE_ENV === 'production'
        ? `${req.protocol}://${req.get('host')}`
        : 'http://localhost:3000'

export default baseUrl
