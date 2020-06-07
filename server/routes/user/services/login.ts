import { Request, Response, NextFunction } from 'express'

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        console.log(email, password)
    } catch (error) {
        next(error)
    }
}
