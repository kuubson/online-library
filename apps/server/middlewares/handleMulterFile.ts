import { API, ApiError, filesInfo } from '@online-library/tools'

import { multerFile } from 'middlewares'

import { reduceImageSize } from 'helpers'

import type { InitialBody, InitialCookies, Middleware } from 'types/express'

const { header, errors } = API['/api/user/chat/file'].post

export const handleMulterFile: Middleware<InitialBody, InitialCookies, 'protected'> = (
   req,
   res,
   next
) =>
   multerFile.single('file')(req, res, () => {
      try {
         if (!req.file) {
            throw new ApiError(header, errors[422], 422)
         }

         const { images } = filesInfo.regex

         const { mimetype, originalname, path } = req.file

         const isImage = images.test(mimetype) || images.test(originalname)

         if (isImage) {
            return reduceImageSize(path, next)
         }

         next()
      } catch (error) {
         next(error)
      }
   })
