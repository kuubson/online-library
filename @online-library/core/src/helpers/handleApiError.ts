/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import { ConnectivityError, RequestError, callback, isProd, isProdWeb } from '@online-library/tools'

import { setApiFeedback } from 'helpers'

import { history, navigate } from 'utils'

import type { ResponseError } from 'types'

export const handleApiError = <T extends unknown>(error: T) => {
   if (!isProd) {
      console.log(error)
   }

   const { response, request } = error as ResponseError

   if (response.data) {
      const {
         status,
         data: { errorHeader, errorMessage },
      } = response

      if (status === 401) {
         callback({
            web: () => history.push('/login'),
            native: () => navigate('Login'),
         })
      }

      if (errorHeader && errorMessage) {
         return setApiFeedback(errorHeader, errorMessage)
      }

      return setApiFeedback(
         ConnectivityError.errorHeader,
         ConnectivityError.errorMessage,
         'Refresh the application',
         () => isProdWeb && window.location.reload()
      )
   }

   if (request) {
      return setApiFeedback(
         RequestError.errorHeader,
         RequestError.errorMessage,
         'Refresh the application',
         () => isProdWeb && window.location.reload()
      )
   }

   setApiFeedback(
      ConnectivityError.errorHeader,
      'An unexpected problem has occurred in the application',
      'Refresh the application',
      () => isProdWeb && window.location.reload()
   )
}
