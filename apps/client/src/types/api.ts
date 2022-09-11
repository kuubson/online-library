import type { Role, messageTypes } from '@online-library/tools'

import type { Book } from 'gql'

import type { MessageType } from 'types'

export type CheckTokenResponse = {
   role: Role
}

export type GetMessagesResponse = {
   messages: MessageType[]
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
   type: typeof messageTypes[number]
   content: string
}

export type CreatePayPalPaymentResponse = {
   link: Location
}
