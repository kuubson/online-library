import type { MESSAGE_TYPE, MessageType, Role } from '@online-library/config'

import type { Book } from 'gql'

export type TokenCheckResponse = {
   role: Role
}

export type MessagesResponse = {
   messages: MessageType[]
   userId: string
   userName: string
}
export type BooksResponse = {
   books: Book[]
}

export type ChatDetailsResponse = {
   lastUnreadMessageIndex: number
   unreadMessagesAmount: number
   userId: string
}

export type SendFileResponse = {
   type: typeof MESSAGE_TYPE[number]
   content: string
}

export type PaypalCheckoutResponse = {
   link: string
}
