import { useSelector } from 'react-redux'

export const useLoader = () => {
   const { loading } = useSelector(state => state.loader)
   return { loading }
}
