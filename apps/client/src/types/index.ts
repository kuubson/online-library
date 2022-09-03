import type { GraphQLError } from 'graphql'

import type { Role } from 'online-library'

import type { Book } from 'gql'

export type SetBookPopupDataFn = ReactDispatch<Book | undefined>

export type CheckTokenResponse = {
   role: Role
}

export type GetMessagesResponse = {
   messages: Message[]
   userId: string
   userName: string
}
export type GetSuggestionsResponse = {
   books: Book[]
}

export type GetMessagesInfoResponse = {
   lastUnreadMessageIndex: number
   unreadMessagesAmount: number
   userId: string
}

export type SendFileResponse = {
   type: string
   content: string
}

export type BookSuggestionsProps = {
   freeBooks: Book[]
   paidBooks: Book[]
   setFreeBooks: ReactDispatch<Book[]>
   setPaidBooks: ReactDispatch<Book[]>
   withProfile?: boolean
}

type GraphqlError = GraphQLError & {
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

export type FBType = any

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
