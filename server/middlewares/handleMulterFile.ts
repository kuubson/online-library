import { multerFile } from 'middlewares'

import { deleteTemporaryFile, reduceImageSize } from 'helpers'

import { ApiError, filesInfo } from 'utils'

import { MulterMiddleware } from 'types/multer'

export const handleMulterFile = (): MulterMiddleware => (req, res, next) =>
    multerFile.single('file')(req, res, () => {
        switch (true) {
            case !req.file as boolean:
                next(new ApiError('Sending a file', 'There was a problem sending the file', 500))
                break
            case req.allowedExtenstionsError:
                deleteTemporaryFile(req.file.path)
                next(
                    new ApiError(
                        'Sending a file',
                        'You cannot send a file with this extension',
                        500
                    )
                )
                break
            case req.sizeLimit:
                deleteTemporaryFile(req.file.path)
                next(new ApiError('Sending a file', 'You cannot send this large file', 500))
                break
            default:
                const { images } = filesInfo.regex
                const { mimetype, originalname, path } = req.file
                if (images.test(mimetype) || images.test(originalname)) {
                    reduceImageSize(path, next)
                } else {
                    next()
                }
        }
    })
