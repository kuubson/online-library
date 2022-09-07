type ReactDispatch<T> = React.Dispatch<React.SetStateAction<T>>

type SocketType = WritableDraft<Socket<DefaultEventsMap, DefaultEventsMap>>

type Message = {
   id: number
   type: 'MESSAGE' | 'IMAGE' | 'VIDEO' | 'FILE'
   content: string
   filename?: string
   userId: string
   userName: string
   createdAt: string
}
