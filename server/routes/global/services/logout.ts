import { Request, Response, NextFunction } from 'express'

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
    }
}
