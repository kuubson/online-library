import { useState } from 'react'

import { API } from '@online-library/tools'

import { history, useCart, useSocket, useTopOffset } from '@online-library/core'

import { apiAxios } from 'utils'

import type { FBStatus } from 'types'

export const useMenu = () => {
   const { closeSocketConnection } = useSocket()

   const [shouldMenuExpand, setShouldMenuExpand] = useState(false)

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

   const shouldMenuStick = useTopOffset() > 20

   return {
      shouldMenuExpand,
      shouldMenuStick,
      setShouldMenuExpand,
      logout,
   }
}
