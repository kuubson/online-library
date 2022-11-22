import { API } from '@online-library/config'

import { defaultAxios } from 'utils'

const urlBase64ToUint8Array = (publicVapidKeyBase64: string | undefined) => {
   if (publicVapidKeyBase64) {
      const padding = '='.repeat((4 - (publicVapidKeyBase64.length % 4)) % 4)
      const base64 = (publicVapidKeyBase64 + padding).replace(/-/g, '+').replace(/_/g, '/')
      const rawData = window.atob(base64)
      const outputArray = new Uint8Array(rawData.length)
      for (let i = 0; i < rawData.length; ++i) {
         outputArray[i] = rawData.charCodeAt(i)
      }
      return outputArray
   }
}

export const subscribePushNotifications = async (publicVapidKeyBase64: string | undefined) => {
   try {
      const { permissions, serviceWorker } = navigator

      const handlePushNotifications = async () => {
         if (serviceWorker) {
            const { pushManager } = await serviceWorker.ready

            if (pushManager) {
               const subscription = await pushManager.subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: urlBase64ToUint8Array(publicVapidKeyBase64),
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
