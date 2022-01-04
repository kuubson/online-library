import { useDispatch, useSelector } from 'react-redux'
import { Socket } from 'socket.io-client'

import { RootState } from 'redux/reducers'

import actions from 'redux/actions'

export const useSocket = () => {
    const dispatch = useDispatch()
    const { socket } = useSelector((state: RootState) => state.socket)
    const setSocket = (payload: Socket | undefined) =>
        dispatch({ type: actions.setSocket, payload })
    return {
        socket,
        setSocket
    }
}
