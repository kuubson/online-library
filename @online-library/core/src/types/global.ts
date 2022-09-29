import type { GraphQLError } from 'graphql'

export type FBLoginRequest = {
   authResponse: {
      userID: string
      signedRequest: string
      expiresIn: string
      accessToken: string
   }
   status: 'connected' | 'not_authorized'
}

export type FBMeRespose = {
   first_name: string
   email: string
}

export type FBStatus = {
   status: string
}

export type FormEvent = React.FormEvent<HTMLFormElement>

export type ReactChildren = {
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
