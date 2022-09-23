import { API } from 'api'

export class ApiError extends Error {
   errorHeader: string
   errorMessage: string
   status: number
   constructor(errorHeader: string, errorMessage: string, status: number) {
      super()
      this.errorHeader = errorHeader
      this.errorMessage = errorMessage
      this.status = status
   }
}

export class AuthErrorBase extends ApiError {
   constructor() {
      super('Authentication', 'The authentication cookie is invalid, log in again', 401)
   }
}

export const CSRFError = new ApiError(
   'Authentication',
   'Invalid csrf token. Make sure any extension does not block cookies',
   403
)

export const AuthError = new AuthErrorBase()

export const ConnectivityError = new ApiError(
   'Server connectivity',
   'There was a problem connecting to the server',
   500
)

export const RequestError = new ApiError(
   'Request processing',
   'The server cannot temporarily process the request',
   500
)

export const DataValidationError = new ApiError(
   'Data validation',
   'Something went wrong, try again',
   422
)

export const RateLimitError = new ApiError(
   'Too many requests',
   'Max amount of requests has been exceeded, try again later',
   429
)

export const ExpiredToken = new ApiError(
   'Request processing',
   'Token required by this action has expired',
   422
)

export const InvalidToken = new ApiError(
   'Request processing',
   'Token required by this action is invalid',
   422
)

export const fbLogin = API['/api/user/auth/login/fb'].post

export const FBError = new ApiError(fbLogin.header, fbLogin.errors[400], 400)

export const sendFile = API['/api/user/chat/files'].post

export const EmptyFileError = new ApiError(sendFile.header, sendFile.errors[422], 422)
