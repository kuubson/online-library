import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: (_, __, callback) => {
        try {
            const destination = `./uploads`
            !fs.existsSync(destination) && fs.mkdirSync(destination)
            return callback(null, destination)
        } catch (error) {}
    },
    filename: (_, { originalname }, callback) => {
        const extension = path.extname(originalname)
        const hash = crypto.randomBytes(30).toString('hex')
        callback(null, `filefilename${originalname}filename${hash}${extension}`)
    }
})

const multerFile = multer({
    storage,
    fileFilter: (req, { mimetype, originalname, size }, callback) => {
        const imageExtensions = /jpg|jpeg|png|gif|/i
        const videoExtensions = /mp4|/i
        const fileExtensions = /txt|rtf|doc|docx|xlsx|ppt|pptx|pdf|/i
        const isImage = imageExtensions.test(mimetype) || imageExtensions.test(originalname)
        const isVideo = videoExtensions.test(mimetype) || videoExtensions.test(originalname)
        const isFile = fileExtensions.test(mimetype) || fileExtensions.test(originalname)
        if (!isImage && !isVideo && !isFile) {
            req.allowedExtenstionsError = true
            return callback(null, false)
        }
        if (isImage) {
            if (size > 31457280) {
                req.sizeLimit = true // 30MB
                return callback(null, false)
            }
        }
        if (isVideo) {
            if (size > 52428800) {
                req.sizeLimit = true // 50MB
                return callback(null, false)
            }
        }
        if (isFile) {
            if (size > 10485760) {
                req.sizeLimit = true // 10MB
                return callback(null, false)
            }
        }
        return callback(null, true)
    }
})

export default multerFile
