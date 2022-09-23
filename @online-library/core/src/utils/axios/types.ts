import type { AxiosResponse } from 'axios'
import type { InferType } from 'yup'

import type { AnyAxiosOverloadData, AnyAxiosOverloadPayload } from 'types'

import type { TypedSchema } from 'yup/lib/util/types'

export type Methods = 'get' | 'post' | 'put' | 'patch' | 'delete'

type Request<M extends Methods> = {
   method: M
   url: string
}

export type AxiosOverload = {
   <P extends TypedSchema | AnyAxiosOverloadPayload, D = AnyAxiosOverloadData>(
      request: Request<Methods>,
      data?: P extends TypedSchema ? InferType<P> : P
   ): Promise<AxiosResponse<D, unknown>>
}

export type AxiosOverloadArgs = (
   request: Request<Methods>,
   data?: unknown
) => ReturnType<AxiosOverload>
