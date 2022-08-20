import { useAppSelector } from 'redux/hooks'

export const useLoader = () => {
   const { loading } = useAppSelector(state => state.loader)
   return {
      loading,
   }
}
