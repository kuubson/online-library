import { Request, Response, NextFunction } from 'express'
import passport from 'passport'

import { User } from '../database/database'

export interface IPassportData {
    user: User
    role: 'user' | 'admin'
}

export default (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (error, { user, role }: IPassportData) => {
        if (error || !user || role !== req.originalUrl.split('/')[2]) {
            return res
                .clearCookie('token', {
                    secure: process.env.NODE_ENV === 'production',
                    httpOnly: true,
                    sameSite: true
                })
                .status(401)
                .send({
                    errorHeader: 'Authorization',
                    errorMessage: 'The authentication cookie is invalid, log in again'
                })
        }
        req.user = user
        next()
    })(req, res, next)
}
