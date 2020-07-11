import { Response } from 'express'

export interface IError {
    code: string
    status: number
    errorHeader: string
    errorMessage: string
}

export default (res: Response, error: IError) => {
    console.log(error)
    const status = error.status || 500
    const errorHeader = error.errorHeader || 'Request Processing'
    const errorMessage = error.errorMessage || 'The server cannot temporarily process your request'
    const authorizationError = status === 401
    if (authorizationError || error.code === 'EBADCSRFTOKEN') {
        return res
            .clearCookie('token', {
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
                sameSite: true
            })
            .status(authorizationError ? status : 403)
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
