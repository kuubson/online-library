import { API } from './API'

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

export const AuthError = new ApiError(
   'Authentication',
   'The authentication cookie is invalid, log in again',
   401
)

export const ConnectivityError = new ApiError(
   'Server connectivity',
   'There was a problem connecting to the server',
   500
)

export const RequestError = new ApiError(
   'Request processing',
   'The server cannot temporarily process your request',
   500
)

export const DataValidationError = new ApiError(
   'Data validation',
   'Something went wrong, try again',
   422
)

export const RateLimitError = new ApiError(
   'Too many requests',
   'You have exceeded max amount of requests, try again later',
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

const { header, post } = API.loginWithFacebook

export const FBError = new ApiError(header, post[400], 400)
