import type { GraphQLError } from 'graphql'

import type { messageTypes } from '@online-library/core'

import type { Book } from 'gql'

import type { AnyFBType } from './any'

export * from './any'
export * from './api'

export type GraphqlError = GraphQLError & {
   exception: {
      errorHeader: string
      errorMessage: string
   }
}

export type ApiError = {
   response: {
      status: number
      data: GraphqlError['exception']
   }
   request: unknown
}

export type FBType = AnyFBType

export type FBStatus = {
   status: string
}

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

export type SetBookPopupDataFn = ReactDispatch<Book | undefined>

export type BookSuggestionsProps = {
   freeBooks: Book[]
   paidBooks: Book[]
   setFreeBooks: ReactDispatch<Book[]>
   setPaidBooks: ReactDispatch<Book[]>
   withProfile?: boolean
}

export type MessageType = {
   id: number
   type: typeof messageTypes[number]
   content: string
   filename?: string
   userId: string
   user: {
      name: string
   }
   createdAt: string
}
