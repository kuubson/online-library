type ReactDispatch<T> = React.Dispatch<React.SetStateAction<T>>

type Role = 'guest' | 'user'

type SocketType = WritableDraft<Socket<DefaultEventsMap, DefaultEventsMap>>
