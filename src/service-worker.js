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
    const { title, body, image, icon, data } = event.data.json()
    event.waitUntil(
        self.registration.showNotification(title, {
            body,
            image,
            icon,
            data
        })
    )
})

self.addEventListener('notificationclick', ({ notification }) => {
    notification.close()
    clients.openWindow(notification.data.url)
})
