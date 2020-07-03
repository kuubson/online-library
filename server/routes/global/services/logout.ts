import { Request, Response, NextFunction } from 'express'
import { check } from 'express-validator'

export default {
    default: (_: Request, res: Response, next: NextFunction) => {
        try {
            res.clearCookie('token', {
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
                sameSite: true
            }).send({
                success: true
            })
        } catch (error) {
            next(error)
        }
    },
    validation: () => [check('token').trim().notEmpty().isJWT()]
}
