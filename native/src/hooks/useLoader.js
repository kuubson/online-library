import { useDispatch, useSelector } from 'react-redux'

export default () => {
    const dispatch = useDispatch()
    const { isLoading } = useSelector(state => state.loader)
    const setIsLoading = payload => dispatch({ type: 'setIsLoading', payload })
    return {
        isLoading,
        setIsLoading
    }
}
