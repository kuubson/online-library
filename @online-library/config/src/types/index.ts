import type { MESSAGE_TYPE, ROLE } from 'utils'

export type Role = typeof ROLE[number]

export type MessageType = {
   id: number
   type: typeof MESSAGE_TYPE[number]
   content: string
   filename?: string
   userId: string
   user: {
      name: string
   }
   createdAt: string
}

export type ApiMethod<M, E extends keyof any, V> = {
   readonly request: {
      readonly method: M
      readonly url: string
   }
   validation: V extends null ? null : V
   header: string
   errors: Record<E, string>
}

export type HasId = {
   id: number
   [key: string]: any
}
