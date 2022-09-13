import type { AxiosResponse } from 'axios'
import axios from 'axios'
import { debounce } from 'lodash'

import { handleApiError, setLoading } from 'helpers'

const debounceLoader = debounce(() => setLoading(true), 800)

const resetLoader = () => {
   setLoading(false)
   debounceLoader.cancel()
}

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

type Request<M = 'get'> = {
   method: M
   url: string
}

type AxiosOverload = {
   <D>(request: Request): Promise<AxiosResponse<D, unknown>>
   <D>(request: Request<'post' | 'put' | 'delete'>, data?: unknown): Promise<
      AxiosResponse<D, unknown>
   >
}

type AxiosOverloadArgs = (
   request: Request<'get' | 'post' | 'put' | 'delete'>,
   data?: unknown
) => ReturnType<AxiosOverload>

export const apiAxios: AxiosOverload = (...[request, data]: Parameters<AxiosOverloadArgs>) =>
   customAxios.request({
      ...request,
      data,
   })

export const defaultAxios: AxiosOverload = (...[request, data]: Parameters<AxiosOverloadArgs>) =>
   axios.request({
      ...request,
      data,
   })
