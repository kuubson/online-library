import { Response } from 'express'

export const handleError = (res: Response, error: any) => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(error)
    }
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
            .status(authorizationError ? 401 : 403)
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
