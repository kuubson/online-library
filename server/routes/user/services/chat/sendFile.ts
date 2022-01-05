import { Response, NextFunction } from 'express'

import cloudinary from 'cloudinary'
import webpush from 'web-push'

import { User, Subscription } from 'database'

import { deleteTemporaryFile } from 'helpers'

import { Op, ApiError, baseUrl } from 'utils'

import { UserRequest } from 'types/express'
import { MulterRequest } from 'types/multer'

export const sendFile = async (
    req: UserRequest & MulterRequest,
    res: Response,
    next: NextFunction
) => {
    const { filename, path } = req.file
    try {
        const { id, name } = req.user
        let type, content, cloudinaryId
        switch (true) {
            case /jpg|jpeg|png|gif/i.test(filename):
                type = 'IMAGE'
                break
            case /mp4/i.test(filename):
                type = 'VIDEO'
                break
            case /txt|rtf|doc|docx|xlsx|ppt|pptx|pdf/i.test(filename):
                type = 'FILE'
                break
            default:
                throw new ApiError(
                    'Sending a file',
                    'There was an unexpected problem when sending the file',
                    500
                )
        }
        let message: string
        if (type === 'IMAGE') {
            message = `${name} has sent a new image`
            const { public_id, secure_url } = await cloudinary.v2.uploader.upload(path, {
                use_filename: true
            })
            content = secure_url
            cloudinaryId = public_id
        }
        if (type === 'VIDEO') {
            message = `${name} has sent a new video`
            const { public_id, secure_url } = await cloudinary.v2.uploader.upload(path, {
                resource_type: 'video',
                use_filename: true
            })
            content = secure_url
            cloudinaryId = public_id
        }
        if (type === 'FILE') {
            message = `${name} has sent a new file`
            const { public_id, secure_url } = await cloudinary.v2.uploader.upload(path, {
                resource_type: 'raw',
                use_filename: true
            })
            content = secure_url
            cloudinaryId = public_id
        }
        deleteTemporaryFile(path)
        await req.user.createMessage({
            type,
            content,
            readBy: id,
            cloudinaryId
        })
        await User.findAll({
            where: {
                id: {
                    [Op.ne]: id
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
                                body: message,
                                icon: 'https://picsum.photos/1920/1080',
                                data: {
                                    userName: name,
                                    url: `${baseUrl(req)}/chat`
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
            type,
            content
        })
    } catch (error) {
        deleteTemporaryFile(path)
        next(error)
    }
}
