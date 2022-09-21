import { socketActions } from '@redux/reducers/socket'

import { useSelector } from 'hooks'

import { useAction } from './useAction'

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
