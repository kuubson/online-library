import type { MESSAGE_TYPES, MessageType, Role } from '@online-library/config'

export type TokenCheckResponse = {
   role: Role
}

export type MessagesResponse = {
   messages: MessageType[]
   userId: string
   userName: string
}

export type ChatDetailsResponse = {
   lastUnreadMessageIndex: number
   unreadMessagesAmount: number
   userId: string
}

export type SendFileResponse = {
   type: typeof MESSAGE_TYPES[number]
   content: string
}

export type PaypalCheckoutResponse = {
   link: string
}
