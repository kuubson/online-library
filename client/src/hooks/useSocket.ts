import { Socket } from 'socket.io-client'

import { useAppDispatch, useAppSelector } from 'redux/hooks'

import { setSocket as setSocketAction } from 'redux/reducers/socket'

export const useSocket = () => {
    const dispatch = useAppDispatch()
    const { socket } = useAppSelector(state => state.socket)
    const setSocket = (socket: Socket | null) => dispatch(setSocketAction(socket))
    const closeSocketConnection = () => {
        if (socket) {
            socket.disconnect()
            setSocket(null)
        }
    }
    return {
        socket,
        setSocket,
        closeSocketConnection
    }
}
