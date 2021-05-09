import { check } from 'express-validator'
import webpush from 'web-push'

import { Connection, User, Subscription } from '@database'

import utils from '@utils'

webpush.setVapidDetails(
    `mailto:${process.env.NODEMAILER_USERNAME}`,
    process.env.REACT_APP_PUBLIC_VAPID_KEY,
    process.env.PRIVATE_VAPID_KEY
)

export default async (req, res, next) => {
    try {
        await Connection.transaction(async transaction => {
            const { content } = req.body
            await req.user.createMessage(
                {
                    type: 'MESSAGE',
                    content
                },
                {
                    transaction
                }
            )
            await User.findAll({
                where: {
                    id: {
                        [utils.Op.ne]: req.user.id
                    }
                },
                include: [Subscription]
            }).then(users =>
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
                                JSON.stringify({
                                    title: 'Online Library',
                                    body: `User ${req.user.name} has sent a new message!`,
                                    icon: `${utils.baseUrl(req)}/manifest-icon.png`,
                                    data: {
                                        url: `${utils.baseUrl(req)}/user/chat`
                                    }
                                })
                            )
                            .catch(async ({ statusCode }) => {
                                if (statusCode === 410) {
                                    await subscription.destroy()
                                }
                            })
                    })
                })
            )
            res.send({
                success: true
            })
        })
    } catch (error) {
        next(error)
    }
}

export const validation = () => [check('content').trim().isString().bail()]
