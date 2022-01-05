import { Connection } from 'database'

import utils from 'utils'

import { ProtectedRoute } from 'types/express'

const subscribePushNotifications: ProtectedRoute = async (req, res, next) => {
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
    utils.validator.validateProperty('endpoint'),
    utils.validator.validateProperty('keys.p256dh'),
    utils.validator.validateProperty('keys.auth')
]

export default subscribePushNotifications
