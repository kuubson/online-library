import type { default as swagger } from '../../../apps/server/swagger/swagger.json'

export const roles = ['guest', 'user'] as const

export type Role = typeof roles[number]

export const messageTypes = ['MESSAGE', 'IMAGE', 'VIDEO', 'FILE'] as const

export type SwaggerPaths = typeof swagger.paths

export type PathMethod<T extends string | number | symbol, M, V> = {
   readonly _method: M
   url: string
   header: string
   errors: Record<T, string>
   validation: V
}
