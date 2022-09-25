import axios from 'axios'

import { debounceLoader, handleApiError, resetLoader } from 'helpers'

import type { AxiosOverload, AxiosOverloadArgs } from 'types'

export const customAxios = axios.create()

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

export const defaultAxios: AxiosOverload = (...[request, data]: Parameters<AxiosOverloadArgs>) =>
   axios.request({
      ...request,
      data,
   })
