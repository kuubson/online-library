import { Request } from 'express'

export default (req: Request) =>
    `${process.env.NODE_ENV === 'production' ? 'https' : 'http'}://${req.headers.host}`
