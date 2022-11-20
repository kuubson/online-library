import type { GraphQLError } from 'graphql'

export type FBMeRespose = {
   first_name: string
   email: string
}

export type FBStatus = {
   status: string
}

export type FormEvent = React.FormEvent<HTMLFormElement>

export type ReactFC = {
   children: React.ReactNode
}
export type ReactDispatch<T> = React.Dispatch<React.SetStateAction<T>>

export type GraphqlError = GraphQLError & {
   exception: {
      errorHeader: string
      errorMessage: string
   }
}

export type ResponseError = {
   response: {
      status: number
      data: GraphqlError['exception']
   }
   request: unknown
}

export type Callback = () => void

export type CloseEvent = {
   wasClean: boolean
   code: number
   reason: string
   type: string
   target: any
}
