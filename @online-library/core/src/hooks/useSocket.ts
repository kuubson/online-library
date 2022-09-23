import { socketActions } from '@redux/reducers/socket'

import { useAction, useSelector } from 'hooks'

export const useSocket = () => {
   const { socket } = useSelector(state => state.socket)

   const setSocket = useAction(socketActions.setSocket)

   const closeSocketConnection = () => {
      socket?.disconnect()
      setSocket(null)
   }

   return {
      socket,
      setSocket,
      closeSocketConnection,
   }
}
