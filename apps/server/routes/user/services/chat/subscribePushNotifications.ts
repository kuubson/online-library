import { Connection } from 'database'

import { validator } from 'helpers'

import { ProtectedRoute } from 'types/express'

export const subscribePushNotifications: ProtectedRoute = async (req, res, next) => {
    try {
        await Connection.transaction(async transaction => {
            const {
                endpoint,
                keys: { p256dh, auth }
            } = req.body
            await req.user.getSubscriptions().then(async subscriptions => {
                if (!subscriptions.some(subscription => subscription.endpoint === endpoint)) {
                    await req.user.createSubscription(
                        {
                            endpoint,
                            p256dh,
                            auth
                        },
                        {
                            transaction
                        }
                    )
                }
            })
            res.send({
                success: true
            })
        })
    } catch (error) {
        next(error)
    }
}

export const validation = () => [
    validator.validateProperty('endpoint'),
    validator.validateProperty('keys.p256dh'),
    validator.validateProperty('keys.auth')
]
