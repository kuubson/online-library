/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import { setApiFeedback } from '@online-library/core'

import { ConnectivityError, RequestError } from '@online-library/tools'

import { NODE_ENV } from 'config'

import { history } from 'utils'

import type { ApiError } from 'types'

const production = NODE_ENV === 'production'

export const handleApiError = <T extends unknown>(error: T) => {
   if (!production) {
      console.log(error)
   }

   const { response, request } = error as ApiError

   if (response.data) {
      const {
         status,
         data: { errorHeader, errorMessage },
      } = response

      if (status === 401) {
         history.push('/login')
      }

      if (errorHeader && errorMessage) {
         return setApiFeedback(errorHeader, errorMessage)
      }

      return setApiFeedback(
         ConnectivityError.errorHeader,
         ConnectivityError.errorMessage,
         'Refresh the application',
         () => production && window.location.reload()
      )
   }

   if (request) {
      return setApiFeedback(
         RequestError.errorHeader,
         RequestError.errorMessage,
         'Refresh the application',
         () => production && window.location.reload()
      )
   }

   setApiFeedback(
      ConnectivityError.errorHeader,
      'An unexpected problem has occurred in the application',
      'Refresh the application',
      () => production && window.location.reload()
   )
}
