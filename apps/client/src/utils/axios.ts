import type { AxiosResponse } from 'axios'
import axios from 'axios'
import { debounce } from 'lodash'
import type { AnySchema, InferType } from 'yup'

import type { PathMethod } from '@online-library/tools'

import { handleApiError, setLoading } from 'helpers'

import type { TypedSchema } from 'yup/lib/util/types'

const debounceLoader = debounce(() => setLoading(true), 1000)

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

type AxiosOverload = {
   <D>(props: PathMethod<string, 'get', AnySchema>): Promise<AxiosResponse<D, unknown>> // TODO: remove AnySchema
   <D>(
      props: PathMethod<string, 'post' | 'put' | 'delete', AnySchema>, // TODO: remove AnySchema
      data?: D extends { validation: TypedSchema } ? InferType<D['validation']> : unknown // TODO: fix TypedSchema
   ): Promise<AxiosResponse<D, unknown>>
}

type AxiosOverloadArgs = (
   props: PathMethod<string, 'post' | 'get' | 'put' | 'delete', AnySchema>, // TODO: remove AnySchema
   data?: unknown
) => ReturnType<AxiosOverload>

export const apiAxios: AxiosOverload = (...[props, data]: Parameters<AxiosOverloadArgs>) =>
   axios.request({
      url: props.url,
      method: props._method,
      data,
   })

export const defaultAxios: AxiosOverload = (...[props, data]: Parameters<AxiosOverloadArgs>) =>
   axios.request({
      url: props.url,
      method: props._method,
      data,
   })
