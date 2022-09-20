import { API } from './API'

class ApiError extends Error {
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

const CSRFError = new ApiError(
   'Authentication',
   'Invalid csrf token. Make sure any extension does not block cookies',
   403
)

class AuthErrorBase extends ApiError {
   constructor() {
      super('Authentication', 'The authentication cookie is invalid, log in again', 401)
   }
}

const AuthError = new AuthErrorBase()

const ConnectivityError = new ApiError(
   'Server connectivity',
   'There was a problem connecting to the server',
   500
)

const RequestError = new ApiError(
   'Request processing',
   'The server cannot temporarily process the request',
   500
)

const DataValidationError = new ApiError('Data validation', 'Something went wrong, try again', 422)

const RateLimitError = new ApiError(
   'Too many requests',
   'Max amount of requests has been exceeded, try again later',
   429
)

const ExpiredToken = new ApiError(
   'Request processing',
   'Token required by this action has expired',
   422
)

const InvalidToken = new ApiError(
   'Request processing',
   'Token required by this action is invalid',
   422
)

const fbLogin = API['/api/user/auth/login/fb'].post

const FBError = new ApiError(fbLogin.header, fbLogin.errors[400], 400)

const sendFile = API['/api/user/chat/files'].post

const EmptyFileError = new ApiError(sendFile.header, sendFile.errors[422], 422)

export {
   ApiError,
   CSRFError,
   AuthErrorBase,
   AuthError,
   ConnectivityError,
   RequestError,
   DataValidationError,
   RateLimitError,
   ExpiredToken,
   InvalidToken,
   FBError,
   EmptyFileError,
}
