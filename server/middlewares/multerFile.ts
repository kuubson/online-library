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
        const name = `${crypto.randomBytes(60).toString('hex')}${path.extname(originalname)}`
        callback(null, name)
    }
})

export const multerFile = multer({
    storage
})
