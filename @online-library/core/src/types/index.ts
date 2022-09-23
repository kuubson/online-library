import type { messageTypes } from '@online-library/tools'

export * from 'utils/axios/types'
export * from 'utils/navigation/types'
export * from './global'

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
