import { Express, Request, Response, NextFunction } from 'express'

interface IError {
    code: string
    status: number
    errorHeader: string
    errorMessage: string
}

export default (app: Express) =>
    app.use((error: IError, _: Request, res: Response, __: NextFunction) => {
        console.log(error)
        if (error.status === 401) {
            return res
                .clearCookie('token', {
                    secure: process.env.NODE_ENV === 'production',
                    httpOnly: true,
                    sameSite: true
                })
                .send({
                    role: 'guest'
                })
        }
        if (error.code === 'EBADCSRFTOKEN') {
            return res
                .clearCookie('token', {
                    secure: process.env.NODE_ENV === 'production',
                    httpOnly: true,
                    sameSite: true
                })
                .status(403)
                .send(false)
        }
        const status = error.status || 500
        const errorHeader = error.errorHeader || 'Request Processing'
        const errorMessage =
            error.errorMessage || 'The server cannot temporarily process your request'
        res.status(status).send({
            errorHeader,
            errorMessage
        })
    })
