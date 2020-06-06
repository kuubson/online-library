import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../redux/reducers'

export default () => {
    const dispatch = useDispatch()
    const { isLoading } = useSelector((state: RootState) => state.loader)
    const setIsLoading = (payload: boolean) => dispatch({ type: 'setIsLoading', payload })
    return {
        isLoading,
        setIsLoading
    }
}
