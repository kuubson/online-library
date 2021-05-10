import { clientsClaim } from 'workbox-core'
import { ExpirationPlugin } from 'workbox-expiration'
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate } from 'workbox-strategies'

clientsClaim()

precacheAndRoute(self.__WB_MANIFEST)

const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$')
registerRoute(({ request, url }) => {
    if (request.mode !== 'navigate') {
        return false
    }
    if (url.pathname.startsWith('/_')) {
        return false
    }
    if (url.pathname.match(fileExtensionRegexp)) {
        return false
    }
    return true
}, createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html'))

registerRoute(
    ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'),
    new StaleWhileRevalidate({
        cacheName: 'images',
        plugins: [new ExpirationPlugin({ maxEntries: 50 })]
    })
)

self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting()
    }
})

self.addEventListener('push', event => {
    const { tag, title, body, image, icon, data } = event.data.json()
    const isFocused = () =>
        clients
            .matchAll({
                type: 'window',
                includeUncontrolled: true
            })
            .then(windows => {
                let isFocused = false
                for (let i = 0; i < windows.length; i++) {
                    if (windows[i].focused) {
                        isFocused = true
                        break
                    }
                }
                return isFocused
            })
    event.waitUntil(
        self.registration
            .getNotifications({
                tag
            })
            .then(notifications => {
                let doesUserNotificationExist = false
                let messagesAmount = 1
                notifications.map(notification => {
                    if (notification) {
                        doesUserNotificationExist = true
                        messagesAmount = notification.data.messagesAmount + 1
                        notification.close()
                    }
                })
                return isFocused().then(isFocused =>
                    !isFocused
                        ? self.registration.showNotification(title, {
                              tag,
                              body: doesUserNotificationExist
                                  ? `${messagesAmount} new messages`
                                  : body,
                              image,
                              icon,
                              data: {
                                  ...data,
                                  messagesAmount
                              }
                          })
                        : null
                )
            })
    )
})

self.addEventListener('notificationclick', event => {
    event.notification.close()
    event.waitUntil(
        clients
            .matchAll({
                type: 'window',
                includeUncontrolled: true
            })
            .then(clientsList => {
                for (let i = 0; i < clientsList.length; i++) {
                    const client = clientsList[i]
                    if ('focus' in client) return client.focus()
                }
                return clients.openWindow(event.notification.data.url)
            })
    )
})
