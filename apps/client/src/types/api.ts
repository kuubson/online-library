import type { Role, messageTypes } from '@online-library/tools'

import type { Book } from 'gql'

import type { MessageType } from 'types'

export type TokenCheckResponse = {
   role: Role
}

export type MessagesResponse = {
   messages: MessageType[]
   userId: string
   userName: string
}
export type BookSuggestionsResponse = {
   books: Book[]
}

export type MessagesInfoResponse = {
   lastUnreadMessageIndex: number
   unreadMessagesAmount: number
   userId: string
}

export type ChatFileResponse = {
   type: typeof messageTypes[number]
   content: string
}

export type PaypalCheckoutResponse = {
   link: string
}
