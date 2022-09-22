export const roles = ['guest', 'user'] as const

export type Role = typeof roles[number]

export const messageTypes = ['MESSAGE', 'IMAGE', 'VIDEO', 'FILE'] as const

export type ReactChildren = {
   children: React.ReactNode
}

export type FormEvent = React.FormEvent<HTMLFormElement>

export type Callback = () => void
