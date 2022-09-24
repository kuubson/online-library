import { API, isWeb } from '@online-library/config'

import type { FBStatus } from '@online-library/core'
import { apiAxios, callback, history, navigate, useCart, useSocket } from '@online-library/core'

export const useLogout = () => {
   const { closeSocketConnection } = useSocket()

   const { resetCart } = useCart()

   const logout = async () => {
      const { request } = API['/api/logout'].get

      const response = await apiAxios(request)

      if (response) {
         if (isWeb) {
            window.FB.getLoginStatus((response: FBStatus) => {
               if (response.status === 'connected') {
                  window.FB.logout(() => null)
               }
            })
         }

         closeSocketConnection()

         resetCart()

         callback({
            web: () => history.push('/login'),
            native: () => navigate('Login'),
         })
      }
   }

   return { logout }
}
