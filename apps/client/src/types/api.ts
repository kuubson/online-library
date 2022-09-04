import type { Role } from 'online-library'

import type { Book } from 'gql'

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
