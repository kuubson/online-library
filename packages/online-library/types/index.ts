export const roles = ['guest', 'user'] as const

export type Role = typeof roles[number]

export const messageTypes = ['MESSAGE', 'IMAGE', 'VIDEO', 'FILE'] as const

export type Method<M, E extends keyof any, V> = {
   readonly method: M
   url: string
   validation: V extends null ? null : V
   header: string
   errors: Record<E, string>
}
