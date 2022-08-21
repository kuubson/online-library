import axios from 'axios'

import { REACT_APP_PUBLIC_VAPID_KEY } from 'config'

import { urlBase64ToUint8Array } from 'helpers'

export const subscribePushNotifications = async (url: string) => {
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
               await axios.post(url, subscription)
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
