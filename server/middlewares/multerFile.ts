import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import multer from 'multer'

import { filesInfo } from 'utils'

import { MulterRequest } from 'types/multer'

const storage = multer.diskStorage({
    destination: (_, __, callback) => {
        try {
            const destination = `./uploads`
            !fs.existsSync(destination) && fs.mkdirSync(destination)
            return callback(null, destination)
        } catch (error) {}
    },
    filename: (_, { originalname }, callback) => {
        const name = `${crypto.randomBytes(60).toString('hex')}${path.extname(originalname)}`
        callback(null, name)
    }
})

export const multerFile = multer({
    storage,
    fileFilter: (req: MulterRequest, { mimetype, originalname }, callback) => {
        const {
            regex: { images, videos, files },
            sizes
        } = filesInfo
        const size = parseInt(req.headers['content-length']!)
        const isImage = images.test(mimetype) || images.test(originalname)
        const isVideo = videos.test(mimetype) || videos.test(originalname)
        const isFile = files.test(mimetype) || files.test(originalname)
        if (!isImage && !isVideo && !isFile) {
            req.allowedExtenstionsError = true
        }
        if (isImage) {
            if (size > sizes.imageMaxSize) {
                req.sizeLimit = true
            }
        }
        if (isVideo) {
            if (size > sizes.maxVideoSize) {
                req.sizeLimit = true
            }
        }
        if (isFile) {
            if (size > sizes.maxFileSize) {
                req.sizeLimit = true
            }
        }
        return callback(null, true)
    }
})
