import { useEffect, useState } from 'react'

import { API } from '@online-library/tools'

import { useCart, useSocket, useTopOffset } from 'hooks'

import { apiAxios, history } from 'utils'

import type { FBStatus } from 'types'

export const useMenu = (_setShouldMenuExpand: ReactDispatch<boolean>) => {
   const { closeSocketConnection } = useSocket()

   const [shouldMenuExpand, setShouldMenuExpand] = useState(false)

   const { resetCart } = useCart()

   useEffect(() => _setShouldMenuExpand(shouldMenuExpand), [shouldMenuExpand])

   const logout = async () => {
      const { request } = API['/api/user/global/logout'].get

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

   const shouldMenuStick = useTopOffset() > 20

   return {
      shouldMenuExpand,
      shouldMenuStick,
      setShouldMenuExpand,
      logout,
   }
}
