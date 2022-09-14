import type { AxiosResponse } from 'axios'
import axios from 'axios'
import type { InferType } from 'yup'

import type { Methods } from '@online-library/tools'

import { handleApiError } from 'helpers'

import type { AnyAxiosOverloadData, AnyAxiosOverloadPayload } from 'types'

import type { TypedSchema } from 'yup/lib/util/types'

import { debounceLoader, resetLoader } from './loader'

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

type Request<M extends Methods> = {
   method: M
   url: string
}

type AxiosOverload = {
   <P extends TypedSchema | AnyAxiosOverloadPayload, D = AnyAxiosOverloadData>(
      request: Request<Methods>,
      data?: P extends TypedSchema ? InferType<P> : P
   ): Promise<AxiosResponse<D, unknown>>
}

type AxiosOverloadArgs = (request: Request<Methods>, data?: unknown) => ReturnType<AxiosOverload>

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
