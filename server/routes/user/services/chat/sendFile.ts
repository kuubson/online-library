import { Response, NextFunction } from 'express'
import cloudinary from 'cloudinary'

import { Connection } from 'database'

import { deleteTemporaryFile } from 'helpers'
import { sendNotificationsForOtherUsers } from './helpers'

import { ApiError, baseUrl, filesInfo } from 'utils'

import { UserRequest } from 'types/express'
import { MulterRequest } from 'types/multer'

export const sendFile = async (
    req: UserRequest & MulterRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        await Connection.transaction(async transaction => {
            const { mimetype, originalname, path } = req.file
            const { id, name } = req.user
            const { images, videos, files } = filesInfo.regex
            let type, content, cloudinaryId
            switch (true) {
                case images.test(mimetype) || images.test(originalname):
                    type = 'IMAGE'
                    break
                case videos.test(mimetype) || videos.test(originalname):
                    type = 'VIDEO'
                    break
                case files.test(mimetype) || files.test(originalname):
                    type = 'FILE'
                    break
                default:
                    throw new ApiError(
                        'Sending a file',
                        'There was an unexpected problem when sending the file',
                        500
                    )
            }
            let message = ''
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
            await req.user.createMessage(
                {
                    type,
                    content,
                    filename: originalname,
                    readBy: id,
                    cloudinaryId
                },
                {
                    transaction
                }
            )
            sendNotificationsForOtherUsers(id, {
                tag: id,
                title: `From ${name}`,
                body: message,
                icon: 'https://picsum.photos/1920/1080',
                data: {
                    userName: name,
                    url: `${baseUrl(req)}/chat`
                }
            })
            res.send({
                type,
                content
            })
        })
    } catch (error) {
        deleteTemporaryFile(req.file.path)
        const emptyTextFile = (error as any).message === 'Empty file'
        if (emptyTextFile) {
            next(new ApiError('Sending a file', 'The selected text file is empty', 422))
        } else {
            next(error)
        }
    }
}
