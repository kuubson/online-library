import _axios from 'axios'

import { handleApiError, setLoading } from 'helpers'

export const axios = _axios.create()

let timeoutId: number | undefined

axios.interceptors.request.use(
   request => {
      if (!timeoutId) {
         timeoutId = window.setTimeout(() => setLoading(true), 500)
      }
      return request
   },
   error => {
      setLoading(false)
      clearTimeout(timeoutId)
      timeoutId = undefined
      handleApiError(error)
      throw error
   }
)

axios.interceptors.response.use(
   response => {
      setLoading(false)
      clearTimeout(timeoutId)
      timeoutId = undefined
      return response
   },
   error => {
      setLoading(false)
      clearTimeout(timeoutId)
      timeoutId = undefined
      handleApiError(error)
      throw error
   }
)
