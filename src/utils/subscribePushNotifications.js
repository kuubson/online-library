import axios from 'axios'

import utils from 'utils'

const urlBase64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}

export default async url => {
    const { permissions, serviceWorker } = navigator
    const handlePushNotifications = async () => {
        if (serviceWorker) {
            const { pushManager } = await serviceWorker.ready
            if (pushManager) {
                const subscription = await pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(
                        process.env.REACT_APP_PUBLIC_VAPID_KEY
                    )
                })
                await axios.post(url, subscription)
            }
        }
    }
    if (permissions) {
        const { state } = await permissions.query({ name: 'push', userVisibleOnly: true })
        switch (state) {
            case 'granted':
                handlePushNotifications()
                break
            case 'prompt':
                utils.setFeedbackData(
                    'Notifications',
                    'Get notifications when new messages come in',
                    'Agree',
                    handlePushNotifications
                )
                break
        }
    } else {
        handlePushNotifications()
    }
}
