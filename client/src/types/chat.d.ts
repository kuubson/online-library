interface IMessage {
    id: number
    type: 'MESSAGE' | 'IMAGE' | 'VIDEO' | 'FILE'
    content: string
    userId: string
    userName: string
    createdAt: string
}
