import type { AxiosResponse } from 'axios'
import axios from 'axios'
import { debounce } from 'lodash'
import type { AnySchema, InferType } from 'yup'
import type { ObjectShape, OptionalObjectSchema } from 'yup/lib/object'

import type { Method } from '@online-library/tools'

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

type AxiosOverload = {
   <D>(props: Method<'get', string, null>): Promise<AxiosResponse<D, unknown>>
   <D>(
      props: Method<'post' | 'put' | 'delete', string, AnySchema | null>,
      data?: D extends { validation: OptionalObjectSchema<ObjectShape> } // TODO: shape of data should equal to shape of yup validation
         ? InferType<D['validation']>
         : unknown
   ): Promise<AxiosResponse<D, unknown>>
}

type AxiosOverloadArgs = (props: any, data?: unknown) => ReturnType<AxiosOverload>

export const apiAxios: AxiosOverload = (...[props, data]: Parameters<AxiosOverloadArgs>) =>
   customAxios.request({
      url: props.url,
      method: props.method,
      data,
   })

export const defaultAxios: AxiosOverload = (...[props, data]: Parameters<AxiosOverloadArgs>) =>
   axios.request({
      url: props.url,
      method: props.method,
      data,
   })
