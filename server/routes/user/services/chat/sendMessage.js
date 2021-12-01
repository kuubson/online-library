import { check } from 'express-validator'
import webpush from 'web-push'

import { Connection, User, Subscription } from '@database'

import utils from '@utils'

webpush.setVapidDetails(
    `mailto:${process.env.NODEMAILER_USERNAME}`,
    process.env.REACT_APP_PUBLIC_VAPID_KEY,
    process.env.PRIVATE_VAPID_KEY
)

const sendMessage = async (req, res, next) => {
    try {
        await Connection.transaction(async transaction => {
            const { id, name } = req.user
            const { content } = req.body
            await req.user.createMessage(
                {
                    type: 'MESSAGE',
                    content,
                    readBy: id
                },
                {
                    transaction
                }
            )
            await User.findAll({
                where: {
                    id: {
                        [utils.Op.ne]: id
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
                                    tag: id,
                                    title: `From ${name}`,
                                    body: `${content}`,
                                    icon: 'https://picsum.photos/1920/1080',
                                    data: {
                                        userName: name,
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

export default sendMessage
