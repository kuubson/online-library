import axios from 'axios'

import { handleApiError, setLoading } from 'helpers'

const apiAxios = axios.create()

let timeoutId: number | undefined

apiAxios.interceptors.request.use(
   request => {
      !timeoutId && (timeoutId = window.setTimeout(() => setLoading(true), 500))
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

apiAxios.interceptors.response.use(
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

export default apiAxios
