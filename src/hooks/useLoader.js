import { useSelector } from 'react-redux'

export default () => {
    const { isLoading } = useSelector(state => state.loader)
    return {
        isLoading
    }
}
