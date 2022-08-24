import { useSelector } from 'hooks'

export const useLoader = () => {
   const { loading } = useSelector(state => state.loader)
   return { loading }
}
