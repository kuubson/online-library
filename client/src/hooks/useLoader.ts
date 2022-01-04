import { useSelector } from 'react-redux'

import { RootState } from 'redux/reducers'

export const useLoader = () => {
    const { loading } = useSelector((state: RootState) => state.loader)
    return {
        loading
    }
}
