import { roleActions } from '@redux/reducers/role'

import { useAction, useSelector } from 'hooks'

export const useRole = () => {
   const { role } = useSelector(state => state.role)

   const setRole = useAction(roleActions.setRole)

   return {
      role,
      setRole,
   }
}
