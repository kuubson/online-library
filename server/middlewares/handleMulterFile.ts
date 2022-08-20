import { multerFile } from 'middlewares'

import { reduceImageSize } from 'helpers'

import { ApiError, filesInfo } from 'utils'

import { MulterMiddleware } from 'types/multer'

export const handleMulterFile = (): MulterMiddleware => (req, res, next) =>
   multerFile.single('file')(req, res, () => {
      if (!req.file) {
         next(new ApiError('Sending a file', 'There was a problem sending the file', 500))
      }
      const { images } = filesInfo.regex
      const { mimetype, originalname, path } = req.file
      const isImage = images.test(mimetype) || images.test(originalname)
      if (isImage) {
         reduceImageSize(path, next)
      } else {
         next()
      }
   })
