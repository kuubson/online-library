export const roles = ['guest', 'user'] as const

export type Role = typeof roles[number]

export const messageTypes = ['MESSAGE', 'IMAGE', 'VIDEO', 'FILE'] as const
