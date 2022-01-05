import webpush from 'web-push'

import { User, Subscription } from 'database'

import { Op } from 'utils'

type NotificationsForOtherUsersSender = (userId: number, options: Options) => void

type Options = {
    tag: number
    title: string
    body: string
    icon: string
    data: {
        userName: string
        url: string
    }
}

export const sendNotificationsForOtherUsers: NotificationsForOtherUsersSender = async (
    userId,
    options
) => {
    const users = await User.findAll({
        where: {
            id: {
                [Op.ne]: userId
            }
        },
        include: [Subscription]
    })
    users.map(user => {
        user.subscriptions.map(subscription => {
            webpush
                .sendNotification(
                    {
                        endpoint: subscription.endpoint,
                        keys: {
                            p256dh: subscription.p256dh,
                            auth: subscription.auth
                        }
                    },
                    JSON.stringify(options)
                )
                .catch(async ({ statusCode }) => {
                    if (statusCode === 410) {
                        await subscription.destroy()
                    }
                })
        })
    })
}
