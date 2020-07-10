import { Response } from 'express'

export interface IError {
    code: string
    status: number
    errorHeader: string
    errorMessage: string
}

export default (res: Response, error: IError) => {
    console.log(error)
    if (error.code === 'EBADCSRFTOKEN') {
        return res
            .clearCookie('token', {
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
                sameSite: true
            })
            .status(403)
            .send({
                error: true
            })
    }
    const status = error.status || 500
    const errorHeader = error.errorHeader || 'Request Processing'
    const errorMessage = error.errorMessage || 'The server cannot temporarily process your request'
    if (status === 401) {
        return res
            .clearCookie('token', {
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
                sameSite: true
            })
            .status(401)
            .send({
                errorHeader,
                errorMessage
            })
    }
    res.status(status).send({
        errorHeader,
        errorMessage
    })
}
