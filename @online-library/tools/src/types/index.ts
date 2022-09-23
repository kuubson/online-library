export const roles = ['guest', 'user'] as const

export type Role = typeof roles[number]

export const messageTypes = ['MESSAGE', 'IMAGE', 'VIDEO', 'FILE'] as const

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
