import _axios from 'axios'
import { debounce } from 'lodash'

import { handleApiError, setLoading } from 'helpers'

export const axios = _axios.create()

const debounceLoader = debounce(() => setLoading(true), 1000)

const resetLoader = () => {
   setLoading(false)
   debounceLoader.cancel()
}

axios.interceptors.request.use(
   request => {
      debounceLoader()
      return request
   },
   error => {
      resetLoader()
      handleApiError(error)
      throw error
   }
)

axios.interceptors.response.use(
   response => {
      resetLoader()
      return response
   },
   error => {
      resetLoader()
      handleApiError(error)
      throw error
   }
)
