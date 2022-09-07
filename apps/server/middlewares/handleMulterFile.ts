import { filesInfo } from 'online-library'
import { ApiError } from 'online-library'

import { multerFile } from 'middlewares'

import { reduceImageSize } from 'helpers'

import type { InitialBody, InitialCookies, Middleware } from 'types/express'

export const handleMulterFile: Middleware<InitialBody, InitialCookies, 'protected'> = (
   req,
   res,
   next
) =>
   multerFile.single('file')(req, res, () => {
      if (!req.file) {
         next(new ApiError('Sending a file', 'There was a problem sending the file', 500))
      }

      const { images } = filesInfo.regex

      const { mimetype, originalname, path } = req.file

      const isImage = images.test(mimetype) || images.test(originalname)

      if (isImage) {
         return reduceImageSize(path, next)
      }

      next()
   })
