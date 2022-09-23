import { API } from '@online-library/config'

import type { FBStatus } from '@online-library/core'
import { apiAxios, history, useCart, useSocket } from '@online-library/core'

export const useLogout = () => {
   const { closeSocketConnection } = useSocket()

   const { resetCart } = useCart()

   const logout = async () => {
      const { request } = API['/api/logout'].get

      const response = await apiAxios(request)

      if (response) {
         const handleGetLoginStatus = (response: FBStatus) => {
            if (response.status === 'connected') {
               window.FB.logout(() => null)
            }
         }

         window.FB.getLoginStatus(handleGetLoginStatus)

         closeSocketConnection()

         resetCart()

         history.push('/login')
      }
   }

   return { logout }
}
