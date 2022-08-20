import { setApiFeedback } from 'helpers'

import { history } from 'utils'

const production = NODE_ENV === 'production'

export const handleApiError = (error: any) => {
   if (!production) {
      console.log(error)
   }
   if (error.response) {
      const status = error.response.status
      const { errorHeader, errorMessage } = error.response.data
      status === 401 && history.push('/login')
      if (errorHeader && errorMessage) {
         return setApiFeedback(errorHeader, errorMessage, 'Okey')
      }
      return setApiFeedback(
         'Connecting to the server',
         `A connection couldn't be established with the server or an unexpected problem occurred on its side`,
         'Refresh the application',
         () => production && window.location.reload()
      )
   }
   if (error.request) {
      return setApiFeedback(
         'Request Processing',
         'The server cannot temporarily process your request',
         'Refresh the application',
         () => production && window.location.reload()
      )
   }
   setApiFeedback(
      'Request Processing',
      'An unexpected problem has occurred in the application',
      'Refresh the application',
      () => production && window.location.reload()
   )
}
