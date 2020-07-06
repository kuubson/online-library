import { Request, Response, NextFunction } from 'express'
import passport from 'passport'

export default (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate('facebook-token', { session: false })(req, res, next)
