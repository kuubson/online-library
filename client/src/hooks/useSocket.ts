import { _setSocket } from 'redux/reducers/socket'

import { useSelector } from 'hooks'

import { useAction } from './useAction'

export const useSocket = () => {
   const { socket } = useSelector(state => state.socket)

   const setSocket = useAction(_setSocket)

   const closeSocketConnection = () => {
      if (socket) {
         socket.disconnect()
         setSocket(null)
      }
   }

   return {
      socket,
      setSocket,
      closeSocketConnection,
   }
}
