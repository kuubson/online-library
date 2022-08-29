import { useDispatch, useSelector } from 'react-redux'

export default () => {
    const dispatch = useDispatch()
    const { socket } = useSelector(state => state.socket)
    const setSocket = payload => dispatch({ type: 'setSocket', payload })
    return {
        socket,
        setSocket
    }
}
