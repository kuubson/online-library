import axios from 'axios'

import type { AxiosOverload, AxiosOverloadArgs } from '@online-library/core'
import { debounceLoader, resetLoader } from '@online-library/core'

import { handleApiError } from 'helpers'

const customAxios = axios.create()

customAxios.interceptors.request.use(
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

customAxios.interceptors.response.use(
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

export const apiAxios: AxiosOverload = (
   ...[{ method, url }, data]: Parameters<AxiosOverloadArgs>
) => {
   if (method === 'get') {
      return customAxios.get(url, { params: data })
   }
   return customAxios.request({
      method,
      url,
      data,
   })
}
