import { API } from '@online-library/tools'

import { REACT_APP_PUBLIC_VAPID_KEY } from 'config'

import { urlBase64ToUint8Array } from 'helpers'

import { defaultAxios } from 'utils'

export const subscribePushNotifications = async () => {
   try {
      const { permissions, serviceWorker } = navigator

      const handlePushNotifications = async () => {
         if (serviceWorker) {
            const { pushManager } = await serviceWorker.ready

            if (pushManager) {
               const subscription = await pushManager.subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: urlBase64ToUint8Array(REACT_APP_PUBLIC_VAPID_KEY),
               })

               const { request } = API['/api/user/chat/notifications'].post

               defaultAxios(request, subscription)
            }
         }
      }

      if (permissions) {
         const options = {
            name: 'push' as PermissionName,
            userVisibleOnly: true,
         }

         const { state } = await permissions.query(options)

         switch (state) {
            case 'granted':
               handlePushNotifications()
               break
            case 'prompt':
               handlePushNotifications()
               break
         }
      } else {
         handlePushNotifications()
      }
   } catch (error) {
      console.log(error)
   }
}
