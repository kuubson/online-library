import type { AxiosResponse } from 'axios'
import type { InferType } from 'yup'

import type { TypedSchema } from 'yup/lib/util/types'

export type Methods = 'get' | 'post' | 'put' | 'patch' | 'delete'

type Request<M extends Methods> = {
   method: M
   url: string
}

export type AxiosOverload = {
   <D extends object>(request: Request<Methods>): Promise<AxiosResponse<D, unknown>>
   <P extends TypedSchema | any>(
      request: Request<Methods>,
      data?: P extends TypedSchema ? InferType<P> : P
   ): Promise<AxiosResponse<any, unknown>>
   <P extends TypedSchema | any, D extends object>(
      request: Request<Methods>,
      data?: P extends TypedSchema ? InferType<P> : P
   ): Promise<AxiosResponse<D, unknown>>
}

export type AxiosOverloadArgs = (
   request: Request<Methods>,
   data?: unknown
) => ReturnType<AxiosOverload>
