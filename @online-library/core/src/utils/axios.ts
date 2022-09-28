import axios from 'axios'

import type { API } from '@online-library/config'

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

type FilesEndpoint = Extract<keyof typeof API, '/api/user/chat/files'>

export const defaultAxios: AxiosOverload = (...[request, data]: Parameters<AxiosOverloadArgs>) => {
   const filesEndpoint: FilesEndpoint = '/api/user/chat/files'
   return axios.request({
      ...request,
      data,
      headers: request.url === filesEndpoint ? { 'Content-Type': 'multipart/form-data' } : {},
   })
}
