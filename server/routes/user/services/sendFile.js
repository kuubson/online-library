import fs from 'fs'
import cloudinary from 'cloudinary'
import webpush from 'web-push'

import utils from '@utils'

webpush.setVapidDetails(
    `mailto:${process.env.NODEMAILER_USERNAME}`,
    process.env.REACT_APP_PUBLIC_VAPID_KEY,
    process.env.PRIVATE_VAPID_KEY
)

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export default async (req, res, next) => {
    const { filename, path } = req.file
    try {
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
                throw new utils.ApiError(
                    'Sending a file',
                    'There was an unexpected problem when sending the file',
                    500
                )
        }
        if (type === 'IMAGE') {
            const { public_id, secure_url } = await cloudinary.v2.uploader.upload(path, {
                use_filename: true
            })
            content = secure_url
            cloudinaryId = public_id
        }
        if (type === 'VIDEO') {
            const { public_id, secure_url } = await cloudinary.v2.uploader.upload(path, {
                resource_type: 'video',
                use_filename: true
            })
            content = secure_url
            cloudinaryId = public_id
        }
        if (type === 'FILE') {
            const { public_id, secure_url } = await cloudinary.v2.uploader.upload(path, {
                resource_type: 'raw',
                use_filename: true
            })
            content = secure_url
            cloudinaryId = public_id
        }
        try {
            fs.existsSync(path) && fs.unlinkSync(path)
        } catch (error) {}
        await req.user.createMessage({
            type,
            content,
            cloudinaryId
        })
        res.send({
            type,
            content
        })
    } catch (error) {
        try {
            fs.existsSync(path) && fs.unlinkSync(path)
        } catch (error) {}
        next(error)
    }
}
