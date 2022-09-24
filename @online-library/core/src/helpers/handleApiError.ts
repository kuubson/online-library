/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import { ConnectivityError, RequestError, isProd, isProdWeb } from '@online-library/config'

import { setApiFeedback } from 'helpers'

import { callback, history, navigate } from 'utils'

import type { ResponseError } from 'types'

const reload = () => isProdWeb && window.location.reload()

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
         'Reload the application',
         reload
      )
   }

   if (request) {
      return setApiFeedback(
         RequestError.errorHeader,
         RequestError.errorMessage,
         'Reload the application',
         reload
      )
   }

   setApiFeedback(
      ConnectivityError.errorHeader,
      'An unexpected problem has occurred in the application',
      'Reload the application',
      reload
   )
}
