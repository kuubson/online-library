/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import { ConnectivityError, RequestError, isProd, isProdWeb, isWeb } from '@online-library/config'

import { setApiFeedback, setRole } from 'helpers'

import { history } from 'utils'

import type { ResponseError } from 'types'

const refresh = () => isProdWeb && window.location.reload()

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
         setRole('guest')
         if (isWeb) {
            history.push('/login')
         }
      }

      if (errorHeader && errorMessage) {
         return setApiFeedback(errorHeader, errorMessage)
      }

      return setApiFeedback(
         ConnectivityError.errorHeader,
         ConnectivityError.errorMessage,
         'Refresh the app',
         refresh
      )
   }

   if (request) {
      return setApiFeedback(
         RequestError.errorHeader,
         RequestError.errorMessage,
         'Refresh the app',
         refresh
      )
   }

   setApiFeedback(
      ConnectivityError.errorHeader,
      'An unexpected problem has occurred in the application',
      'Refresh the app',
      refresh
   )
}
