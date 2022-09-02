import type { Response } from 'express'

import { API } from 'online-library'

import { NODE_ENV } from 'config'

import { cookie } from 'utils'

import type { ExpressError, OAuthErrorData } from 'types'

export const handleError = (res: Response, error: ExpressError) => {
   if (NODE_ENV !== 'production') {
      console.log(error)
   }

   const status = error.status || 500

   const errorHeader = error.errorHeader || 'Request Processing'

   const errorMessage = error.errorMessage || 'The server cannot temporarily process your request'

   if ('oauthError' in error) {
      const OAuthError = JSON.parse(error.oauthError.data) as OAuthErrorData
      if (OAuthError.error.code === 190) {
         return res.status(400).send({
            errorHeader: API.AUTH.loginWithFacebook.header,
            errorMessage: API.AUTH.loginWithFacebook.post.responses['400'].description,
         })
      }
   }

   const authorizationError = status === 401

   if (authorizationError || error.code === 'EBADCSRFTOKEN') {
      return res
         .clearCookie('token', cookie())
         .status(authorizationError ? 401 : 403)
         .send({
            errorHeader,
            errorMessage,
         })
   }

   res.status(status).send({
      errorHeader,
      errorMessage,
   })
}
